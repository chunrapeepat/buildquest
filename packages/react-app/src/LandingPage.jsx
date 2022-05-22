import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import BountyExplorer from "./BountyExplorer";
import Credit from "./Credit";
import Navbar from "./Navbar";

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  display: grid;
  margin: 30px 0;
  grid-template-columns: 300px 1fr;
  grid-gap: 32px;
`;
const Introduction = styled.div`
  background: rgb(26, 27, 31);
  background: linear-gradient(146deg, rgba(26, 27, 31, 1) 56%, rgba(106, 39, 35, 1) 90%, rgba(105, 62, 25, 1) 100%);
  border-radius: 10px;
  padding: 16px;

  & h2 {
    color: white;
    font-weight: bolder;
  }
  & p {
    color: #ccc;
  }
  & > a {
    background: white;
    padding: 8px;
    text-align: center;
    color: black;
    display: block;
    margin-top: 24px;
    border-radius: 8px;
    transition: 0.2s;
    font-weight: 600;
    &:hover {
      transform: scale(1.03);
      color: black;
    }
  }
`;

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <ContentContainer>
          <div>
            <Introduction>
              <h2>Hello There 🙋🏻‍♂️</h2>
              <p>
                <b>BuildQuest</b> is a grants and bounties platform for Web3 builders.
              </p>
              <p>
                In this version, we've built a bounty disbursement tool that automatically pays out when your PR gets
                merged.
              </p>
              <p>
                We've planned to launch more features soon, please follow our Twitter for more updates or visit our <a href="https://github.com/chunza2542/buildquest" target="_blank">Github Repo</a> for further information.
              </p>
              <a href="https://twitter.com/buildquestxyz" target="_blank">Follow us @buildquestxyz</a>
            </Introduction>
            <Credit />
          </div>
          <div>
            <BountyExplorer />
          </div>
        </ContentContainer>
      </Container>
    </>
  );
};

export default LandingPage;
