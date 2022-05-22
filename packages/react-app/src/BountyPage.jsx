import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { auth, firestore, githubProvider } from "./utils/firebase";
import { Link, useParams } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { Address } from "./components";
import { useAccount, useContract, useSigner } from "wagmi";
import { BUILDQUEST_CONTRACT_ABI } from "./constants";

const Container = styled.div`
  width: 750px;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 24px 0;
  grid-gap: 18px;
`;
const InputBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
`;
const TextArea = styled.textarea`
  width: 100%;
  display: block;
  outline: 0;
  border: 0;
  background: #fafafa;
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    border: 1px solid #aaa;
  }
`;
const Input = styled.input`
  width: 100%;
  display: block;
  outline: 0;
  border: 0;
  background: #fafafa;
  border: 1px solid #eee;
  padding: 8px;
  border-radius: 8px;
  transition: 0.2s;

  &:hover {
    border: 1px solid #aaa;
  }
`;
const Button = styled.button`
  color: white;
  background: #1a1b1f;
  border: 0;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;
const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    color: #555;
  }

  /* Bounty Footer */
  & > div {
    display: flex;
    align-items: center;
  }
  & img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    margin-right: 8px;
  }
  & > div:last-child {
    color: white;
    padding: 3px 7px;
    font-weight: 600;
    border-radius: 8px;
  }
`;
const Submission = styled.div`
  background: #fafafa;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 10px;
  margin-top: 10px;
`;

const BountyPage = () => {
  const { id: bountyId } = useParams();
  const [info, setInfo] = useState(null);
  const [githubUser, setGithubUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: dataAccount } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    addressOrName: "0x0946281477a789fc199C4008FF082e4CC573fbA6",
    contractInterface: BUILDQUEST_CONTRACT_ABI,
    signerOrProvider: signer,
  });

  const [prUrl, setPrUrl] = useState("");
  const [receiver, setReceiver] = useState("0x68fc885719aC82B744E859b7843A155C5bB4C1a5");

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const ref = collection(firestore, "bounties", bountyId, "submissions");
    const q = query(ref, orderBy("createdAt", "asc"));

    onSnapshot(q, snapshot => {
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  useEffect(async () => {
    const docRef = doc(firestore, "bounties", bountyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const bountyInfo = docSnap.data();
      const { data: issueData } = await axios.get(
        `https://api.github.com/repos/${bountyInfo.issueURL.replace("https://github.com/", "")}`,
      );

      setInfo({ ...bountyInfo, body: issueData.body });
    }
  }, []);

  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     setGithubUser(user);
  //   }
  // });

  const connectWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    if (submissions.map(x => x.githubUsername).indexOf(result.user.reloadUserInfo.screenName) !== -1) {
      setIsSubmitted(true);
    }
    setGithubUser(result.user);
  };

  const handleSubmitPR = async () => {
    if (prUrl == "" || receiver == "" || githubUser == "") return;
    const githubUsername = githubUser.reloadUserInfo.screenName;
    const data = {
      githubUsername,
      prUrl,
      receiver,
    };
    console.log({ data });
    const submissionRef = doc(firestore, "bounties", `${bountyId}`, "submissions", githubUsername);
    await setDoc(submissionRef, {
      ...data,
      createdAt: new Date(),
    });
    setIsSubmitted(true);
  };

  const cancelBounty = async () => {
    if (info === null) return;
    const result = await contract.closeBounty(info.bountyId);
    console.log({ result });
    const bountyRef = doc(firestore, "bounties", `${info.bountyId}`);
    await updateDoc(bountyRef, {
      status: "Close",
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Link to="/">
          <ArrowLeftOutlined /> Back to homepage
        </Link>
        {info === null && <h3 style={{ marginTop: 12 }}>Loading...</h3>}
        {info !== null && (
          <>
            <ContentContainer>
              <div>
                <h2>
                  <b>{info.title}</b>
                </h2>
                <Detail>
                  <a href={info.issueURL} target="_blank">
                    <Button style={{ padding: "4px 8px" }}>Start Work</Button>
                  </a>
                  <div>
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
                    Boba Testnet
                  </div>
                  <div>
                    <Address address={info.createdBy} />
                  </div>
                  <div>End at {new Date(info.expiredAt).toLocaleString()}</div>
                  <div>
                    {info.amount} {info.deno}
                  </div>
                  {info.status === "Open" && <div style={{ background: "#3aab3e" }}>{info.status}</div>}
                  {info.status === "Complete" && <div style={{ background: "#4839ab" }}>{info.status}</div>}
                  {info.status === "Close" && <div style={{ background: "#fa423c" }}>{info.status}</div>}
                </Detail>
              </div>
              <InputBox>
                <ReactMarkdown>{info.body}</ReactMarkdown>
                {dataAccount?.address === info.createdBy && (
                  <Button onClick={cancelBounty} style={{ padding: "4px 8px", background: "#fa433c" }}>
                    Cancel Bounty
                  </Button>
                )}
              </InputBox>
              <InputBox>
                <h3>Submissions ({submissions.length})</h3>
                {submissions.map(s => {
                  return (
                    <Submission>
                      <a href={s.prUrl} target="_blank">
                        {s.prUrl}
                      </a>
                      <div>By @{s.githubUsername}</div>
                    </Submission>
                  );
                })}
              </InputBox>

              {!githubUser && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={connectWithGithub}>Connect with Github account to submit</Button>
                </div>
              )}
              {isSubmitted && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3>Submitted!</h3>
                </div>
              )}
              {githubUser && !isSubmitted && (
                <InputBox>
                  <h3>Submit Your PR!</h3>
                  <p>Your PR must be in the same repo and created by you.</p>
                  <div>
                    <label>PR Url:</label>
                    <Input
                      onChange={e => setPrUrl(e.target.value)}
                      value={prUrl}
                      type="text"
                      placeholder="https://github.com/owner/repo/pull/n"
                    ></Input>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <label>Wallet Address:</label>
                    <Input onChange={e => setReceiver(e.target.value)} value={receiver} type="text"></Input>
                  </div>
                  <Button onClick={handleSubmitPR} style={{ marginTop: 16 }}>
                    Submit PR
                  </Button>
                </InputBox>
              )}
            </ContentContainer>
          </>
        )}

        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default BountyPage;
