import Icon from "@ant-design/icons";
import { ethers } from "ethers";
import { doc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useContract, useProvider, useSigner } from "wagmi";
import { BUILDQUEST_CONTRACT_ABI } from "./constants";
import Navbar from "./Navbar";
import { firestore } from "./utils/firebase";

const Container = styled.div`
  width: 650px;
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
const Chains = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12px;
`;
const Chain = styled.div`
  background: #fafafa;
  transition: 0.2s;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${props =>
    props.active
      ? `
    border: 1px solid #446ceb; 
    background: #f3f5f9;
  `
      : ""}

  &:hover {
    border: 1px solid #aaa;
    ${props =>
      props.active
        ? `
      border: 1px solid #446ceb; 
    `
        : ""}
  }

  & img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    margin-right: 10px;
  }
  & h3 {
    margin: 0;
    font-size: 1em;
  }
`;
const Summary = styled.div`
  background: #f3f3f3;
  border-radius: 10px;
  padding: 18px 12px;
  display: flex;
  align-items: center;
  margin-top: 8px;

  & > div:nth-child(1) {
    margin: 0 12px;
    margin-right: 24px;
    & h2 {
      margin: 0;
    }
  }
  & > div:nth-child(2) {
    & h3 {
      margin: 0;
    }
    & h1 {
      margin: 0;
      font-size: 1.6rem;
      font-weight: bold;
    }
    & p {
      margin: 0;
    }
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

const CreateBountyPage = () => {
  const [issueURL, setIssueURL] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [expiredAt, setExpiredAt] = useState(null);
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    addressOrName: "0x0946281477a789fc199C4008FF082e4CC573fbA6",
    contractInterface: BUILDQUEST_CONTRACT_ABI,
    signerOrProvider: signer,
  });

  const handleSubmit = async () => {
    if (issueURL === "" || desc === "" || amount <= 0) return;
    // create tx to create bounty
    const options = { value: ethers.utils.parseEther(`${amount}`) };
    const bountyId = Math.floor(Math.random() * 100000000);
    const result = await contract.createBounty(bountyId, options);
    // get issue title
    const { data: issueData } = await axios.get(
      `https://api.github.com/repos/${issueURL.replace("https://github.com/", "")}`,
    );
    const title = issueData.title;
    const chain = "boba-testnet";
    const deno = "ETH";
    const status = "Open";
    const createdBy = result.from;
    const txHash = result.hash;
    const data = {
      bountyId,
      chain,
      issueURL,
      title,
      desc,
      amount,
      deno,
      txHash,
      status,
      expiredAt,
      createdBy,
    };
    const bountyRef = doc(firestore, "bounties", `${bountyId}`);
    await setDoc(bountyRef, {
      ...data,
      createdAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <div>
            <h2>
              <b>Create New Bounty</b>
            </h2>
            <p>Fund your Github issue and work with talented developers!</p>
          </div>
          <InputBox>
            <h3>
              <b>1. Bounty Chain</b>
            </h3>
            <p>Pick the chain you are funding bounty with</p>
            <Chains>
              <Chain active={true}>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png"></img>
                <h3>Boba Testnet</h3>
              </Chain>
            </Chains>
          </InputBox>
          <InputBox>
            <h3>
              <b>2. Github Issue URL</b>
            </h3>
            <Input
              onChange={e => setIssueURL(e.target.value)}
              value={issueURL}
              type="text"
              placeholder="https://github.com/orgs/repo/issues/n"
            ></Input>
          </InputBox>
          <InputBox>
            <h3>
              <b>3. Short Description</b>
            </h3>
            <p>Write a short description that explains this bounty within 280 characters.</p>
            <TextArea
              onChange={e => setDesc(e.target.value)}
              value={desc}
              maxLength={280}
              rows={4}
              placeholder="Description..."
            ></TextArea>
          </InputBox>
          <InputBox>
            <h3>
              <b>4. Setting</b>
            </h3>
            <div style={{ marginBottom: 10 }}>
              <label>ETH Amount:</label>
              <Input
                onChange={e => setAmount(e.target.value)}
                value={amount}
                type="number"
                placeholder="Amount"
              ></Input>
            </div>
            <div>
              <label>Expire date and time:</label>
              <Input onChange={e => setExpiredAt(e.target.value)} value={expiredAt} type="datetime-local"></Input>
            </div>
          </InputBox>
          <InputBox>
            <h3>
              <b>5. Funding Summary</b>
            </h3>
            <Summary>
              <div>
                <h2>TOTAL</h2>
              </div>
              <div>
                <h1>5,000 ETH</h1>
                <p>Bounty 5,000 ETH (~10,000$) + 0$ BuildQuest Platform Fee</p>
              </div>
            </Summary>
          </InputBox>
        </ContentContainer>
        <Button onClick={handleSubmit}>Fund & Create Bounty</Button>

        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default CreateBountyPage;
