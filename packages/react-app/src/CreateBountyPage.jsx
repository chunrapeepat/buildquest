import Icon from "@ant-design/icons";
import styled from "styled-components";
import Navbar from "./Navbar";

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
  padding: 24px 18px;
  display: flex;
  align-items: center;

  & > div:nth-child(1) {
    margin: 0 32px;
    margin-right: 50px;
    & h1 {
      margin: 0;
    }
  }
  & > div:nth-child(2) {
    & h3 {
      margin: 0;
    }
    & h1 {
      margin: 8px 0;
      font-size: 2rem;
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
  font-size: 1rem;
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
              <Chain>
                <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png"></img>
                <h3>Polygon Mainnet</h3>
              </Chain>
            </Chains>
          </InputBox>
          <InputBox>
            <h3>
              <b>2. Github Issue URL</b>
            </h3>
            <Input type="text" placeholder="https://github.com/orgs/repo/issues/n"></Input>
          </InputBox>
          <InputBox>
            <h3>
              <b>3. Setting</b>
            </h3>
            <div style={{ marginBottom: 10 }}>
              <label>BOBA$ Amount:</label>
              <Input type="number" placeholder="Amount"></Input>
            </div>
            <div>
              <label>Expire date and time:</label>
              <Input type="datetime-local"></Input>
            </div>
          </InputBox>
          <Summary>
            <div>
              <h1>TOTAL</h1>
            </div>
            <div>
              <h3>PAYMENT DUE</h3>
              <h1>5,000 ETH</h1>
              <p>Bounty 5,000 ETH ($) + 0 ETH BuildQuest Platform Fee</p>
            </div>
          </Summary>
        </ContentContainer>
        <Button>Fund & Create Bounty</Button>

        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default CreateBountyPage;
