import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

const Navbar = () => {
  return (
    <Container>
      <Header>
        <Logo>BuildQuest</Logo>
        <div>
          <ConnectButton />
        </div>
      </Header>
    </Container>
  );
};

export default Navbar;
