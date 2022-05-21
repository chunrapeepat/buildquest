import { useState } from "react";
import Icon, { CaretRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import BountyExplorer from "./BountyExplorer";

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0;
`;
const Logo = styled.h2`
  cursor: pointer;
  display: block;
  color: rgb(25, 33, 57);
  font-weight: 600;
  margin: 0;
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
  & a {
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
const Credit = styled.div`
  margin-top: 16px;
  text-align: center;
  & a {
    font-weight: bold;
  }
`;
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const LandingPage = () => {
  return (
    <Container>
      <Header>
        <Logo>BuildQuest</Logo>
        <div>
          <ConnectButton />
        </div>
      </Header>

      <ContentContainer>
        <div>
          <Introduction>
            <h2>Hello There 🙋🏻‍♂️</h2>
            <p>
              <b>BuildQuest</b> is a grants and bounties platform for builders.
            </p>
            <p>
              In this version, we've built a bounty disbursement tool that automatically pays out when your PR gets
              merged.
            </p>
            <a>Follow us @buildquestxyz</a>
          </Introduction>
          <Credit>
            Crafted with <Icon component={HeartSvg} style={{ color: "hotpink" }} /> by{" "}
            <a target="_blank" href="https://twitter.com/chunza2542">
              @chunza2542
            </a>
          </Credit>
        </div>
        <div>
          <BountyExplorer />
        </div>
      </ContentContainer>
    </Container>
  );
};

export default LandingPage;
