import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Address } from "./components";
import { firestore } from "./utils/firebase";

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
        color: white;
        padding: 3px 7px;
        font-weight: 600;
        border-radius: 8px;
      }
    }
  }
`;

const BountyExplorer = () => {
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    const bountiesCollectionRef = collection(firestore, "bounties");
    const q = query(bountiesCollectionRef, orderBy("createdAt", "desc"));

    onSnapshot(q, snapshot => {
      setBounties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <Container>
      <Head>
        <h2>
          <b>Bounty Explorer</b>
        </h2>
        <p>{bounties.length} bounties</p>
      </Head>
      {bounties.map(bounty => {
        return (
          <Link to={`/bounty/${bounty.bountyId}`}>
            <Bounty key={`bounty_${bounty.bountyId}`}>
              <h3>{bounty.title}</h3>
              <p>{bounty.desc}</p>
              <div>
                <div>
                  <div>
                    <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/14556.png" />
                    Boba Testnet
                  </div>
                  <div>
                    <Address address={bounty.createdBy} />
                  </div>
                  <div>End at {new Date(bounty.expiredAt).toLocaleString()}</div>
                </div>
                <div>
                  <div>
                    {bounty.amount} {bounty.deno}
                  </div>
                  {bounty.status === 'Open' &&
                    <div style={{background: '#3aab3e'}}>{bounty.status}</div>
                  }
                  {bounty.status === 'Complete' &&
                    <div style={{background: '#4839ab'}}>{bounty.status}</div>
                  }
                  {bounty.status === 'Close' &&
                    <div style={{background: '#fa423c'}}>{bounty.status}</div>
                  }
                </div>
              </div>
            </Bounty>
          </Link>
        );
      })}
    </Container>
  );
};

export default BountyExplorer;
