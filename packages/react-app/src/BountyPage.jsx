import Icon from "@ant-design/icons";
import { ethers } from "ethers";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContract, useProvider, useSigner } from "wagmi";
import { BUILDQUEST_CONTRACT_ABI } from "./constants";
import Navbar from "./Navbar";
import { firestore } from "./utils/firebase";
import { useParams } from "react-router-dom";

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

const BountyPage = () => {
  const { id: bountyId } = useParams();
  const [info, setInfo] = useState(null);

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

  if (info === null) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <div>
            <h2>
              <b>{info.title}</b>
            </h2>
            <p>Fund your Github issue and work with talented developers!</p>
          </div>
          <InputBox>
            <h3>{info.body}</h3>
          </InputBox>
        </ContentContainer>

        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default BountyPage;
