import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { PlusOutlined } from "@ant-design/icons";

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
const CreateButton = styled.div`
  color: white;
  background: black;
  height: 40px;
  padding: 0 10px;
  margin-left: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const Navbar = () => {
  const { data } = useAccount();

  return (
    <Container>
      <Header>
        <Link to="/">
          <Logo>BuildQuest</Logo>
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ConnectButton children={account => console.log(account)} />
          {data !== null && (
            <Link to="/create">
              <CreateButton>
                <PlusOutlined style={{ marginRight: 8 }} /> New Bounty
              </CreateButton>
            </Link>
          )}
        </div>
      </Header>
    </Container>
  );
};

export default Navbar;
