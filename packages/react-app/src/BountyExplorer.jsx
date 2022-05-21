import styled from "styled-components";
import { Address } from "./components";

const Container = styled.div`
  margin-bottom: 64px;
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const Bounty = styled.a`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  display: block;
  margin-bottom: 12px;

  &:hover {
    border: 1px solid #aaa;
    background-color: #fafafa;
  }

  & p {
    color: #555;
  }

  /* Bounty Footer */
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* Info */
    & > div:nth-child(1) {
      display: flex;
      align-items: center;
      color: #777;

      & > div {
        margin-right: 18px;
      }
      & img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        margin-right: 6px;
      }
    }

    /* Amount and Status */
    & > div:nth-child(2) {
      display: flex;
      align-items: center;

      & > div:nth-child(1) {
        background: #ccc;
        color: black;
        padding: 3px 7px;
        font-weight: 600;
        border-radius: 8px;
        margin-right: 8px;
      }
      & > div:nth-child(2) {
        background: #3aab3e;
        color: white;
        padding: 3px 7px;
        font-weight: 600;
        border-radius: 8px;
      }
    }
  }
`;

const BountyExplorer = () => {
  return (
    <Container>
      <Head>
        <h2>
          <b>Bounty Explorer</b>
        </h2>
        <p>23 bounties</p>
      </Head>
      <Bounty>
        <h3>Create A Superfluid And AddressBook Ceramic Datamodel Integration</h3>
        <p>
          Integrate the Ceramic addressBook datamodel into Superfluid. The most useful place for this integration is
          within the Superfluid Console itself.
        </p>
        <div>
          <div>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
              Boba Network
            </div>
            <div>
              <Address address={"0x79A375feFbF90878502eADBA4A89697896B60c4d"} />
            </div>
            <div>Ends in 20 hours</div>
          </div>
          <div>
            <div>2000 BOBA</div>
            <div>Open</div>
          </div>
        </div>
      </Bounty>
      <Bounty>
        <h3>Create A Superfluid And AddressBook Ceramic Datamodel Integration</h3>
        <p>
          Integrate the Ceramic addressBook datamodel into Superfluid. The most useful place for this integration is
          within the Superfluid Console itself.
        </p>
        <div>
          <div>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
              Boba Network
            </div>
            <div>
              <Address address={"0x79A375feFbF90878502eADBA4A89697896B60c4d"} />
            </div>
            <div>Ends in 20 hours</div>
          </div>
          <div>
            <div>2000 BOBA</div>
            <div>Open</div>
          </div>
        </div>
      </Bounty>
      <Bounty>
        <h3>Create A Superfluid And AddressBook Ceramic Datamodel Integration</h3>
        <p>
          Integrate the Ceramic addressBook datamodel into Superfluid. The most useful place for this integration is
          within the Superfluid Console itself.
        </p>
        <div>
          <div>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
              Boba Network
            </div>
            <div>
              <Address address={"0x79A375feFbF90878502eADBA4A89697896B60c4d"} />
            </div>
            <div>Ends in 20 hours</div>
          </div>
          <div>
            <div>2000 BOBA</div>
            <div>Open</div>
          </div>
        </div>
      </Bounty>
      <Bounty>
        <h3>Create A Superfluid And AddressBook Ceramic Datamodel Integration</h3>
        <p>
          Integrate the Ceramic addressBook datamodel into Superfluid. The most useful place for this integration is
          within the Superfluid Console itself.
        </p>
        <div>
          <div>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
              Boba Network
            </div>
            <div>
              <Address address={"0x79A375feFbF90878502eADBA4A89697896B60c4d"} />
            </div>
            <div>Ends in 20 hours</div>
          </div>
          <div>
            <div>2000 BOBA</div>
            <div>Open</div>
          </div>
        </div>
      </Bounty>
      <Bounty>
        <h3>Create A Superfluid And AddressBook Ceramic Datamodel Integration</h3>
        <p>
          Integrate the Ceramic addressBook datamodel into Superfluid. The most useful place for this integration is
          within the Superfluid Console itself.
        </p>
        <div>
          <div>
            <div>
              <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
              Boba Network
            </div>
            <div>
              <Address address={"0x79A375feFbF90878502eADBA4A89697896B60c4d"} />
            </div>
            <div>Ends in 20 hours</div>
          </div>
          <div>
            <div>2000 BOBA</div>
            <div>Open</div>
          </div>
        </div>
      </Bounty>
    </Container>
  );
};

export default BountyExplorer;
