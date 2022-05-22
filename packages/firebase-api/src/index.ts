import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { privateKey } from "./secret";
import { Contract, ethers } from "ethers";
import { ContractABI } from "./constants";

const app = admin.initializeApp();
const firestore = app.firestore();

const provider = new ethers.providers.JsonRpcProvider(
  "https://rinkeby.boba.network"
);
const wallet = new ethers.Wallet(privateKey, provider);
const contractWithSigner = new Contract(
  "0x0946281477a789fc199C4008FF082e4CC573fbA6",
  ContractABI,
  wallet
);

export const scheduledFunction = functions.pubsub
  .schedule("every 30 minutes")
  // .schedule("*/1 * * * *")
  .onRun(async () => {
    console.log("[Log] Start scheduled function");

    // get all bounties where status == 'Open'
    const bountiesRef = await firestore.collection("bounties");
    const bountiesSnapshot = await bountiesRef.get();
    const bountyIds: string[] = [];
    bountiesSnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.status === "Open") {
        bountyIds.push(`${doc.data().bountyId}`);
      }
    });
    console.log("[Log] Processing " + bountyIds.length + " bounties...");

    // get all submissions
    const submissions: any[] = [];
    Promise.all(
      bountyIds.map(async (id) => {
        const ref = await firestore
          .collection("bounties")
          .doc(id)
          .collection("submissions");
        const snap = await ref.get();
        snap.forEach((doc) => {
          submissions.push({
            url: doc.data().prUrl,
            bid: id,
            addr: doc.data().receiver,
          });
        });
      })
    ).catch(console.error);
    console.log("[Log] Processing " + submissions.length + " submissions...");

    // check all submissions; if merged -> disburse
    for (let i = 0; i < submissions.length; ++i) {
      const urlData = submissions[i].url
        .replace("https://.github.com/", "")
        .split("/");
      const apiUrl = `https://api.github.com/repos/${urlData[0]}/${urlData[1]}/pulls/${urlData[3]}`;
      console.log(`[Log] Debug2 = ${apiUrl}`);
      const bid = submissions[i].bid;
      const addr = submissions[i].addr;
      const { data } = await axios.get(apiUrl);
      if (data.merged) {
        console.log("[Log] found merged PR = " + submissions[i].url);
        // disburse bounty
        const tx = await contractWithSigner.disburse(bid, addr);
        console.log(`[Log] Disburse tx ${tx.hash}`);
        // update bounties
        const ref = await firestore.collection("bounties").doc(bid);
        await ref.update({
          status: "Completed",
          disburseTx: tx.hash,
        });
        break;
      }
    }

    console.log("[Log] DONE");
  });
