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
  margin: 32px 0;
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
            <Input type="text" placeholder="https://github.com/orgs/repo/issues/n"></Input>
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
            deno, amount, usd, expired date
            <Input type="text" placeholder="https://github.com/orgs/repo/issues/n"></Input>
          </InputBox>
        </ContentContainer>
        <button>Create New Bounty</button>
      </Container>
    </>
  );
};

export default CreateBountyPage;
