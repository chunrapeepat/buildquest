// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BuildQuestPOC {
  address public owner;
  mapping(address => uint) public balances;
  uint bountyId = 1;
  // mapping bounty id to bounty struct
  struct bounty_struct {
    address owner;
    uint amount;
    bool isActive;
  }
  mapping(uint => bounty_struct) public bounties;

  // events
  event Created(address owner, uint bountyId, uint amount);
  event Closed(address owner, uint bountyId, uint amount);
  event Completed(uint bountyId, address destAddr, uint amount);

  // init owner
  constructor() public {
    owner = msg.sender;
  }

  // create bounty function
  function createBounty() public payable returns (uint) {
    require(msg.value > 0, 'value must > 0');

    uint id = bountyId++;
    balances[msg.sender] += msg.value;
    bounties[id] = bounty_struct(msg.sender, msg.value, true);

    emit Created(msg.sender, id, msg.value);

    return id;
  }

  // close bounty function
  function closeBounty(uint bountyId) public payable returns (uint) {
    require(bounties[bountyId].amount > 0, 'bounty not found');
    require(bounties[bountyId].isActive == true, 'bounty not active');
    require(bounties[bountyId].owner == msg.sender, 'permission not allowed');

    bounties[bountyId].isActive = false;
    balances[msg.sender] -= bounties[bountyId].amount;
    payable(msg.sender).transfer(bounties[bountyId].amount);

    emit Closed(msg.sender, bountyId, bounties[bountyId].amount);

    return bountyId;
  }

  // get total balances
  function getBalance() public returns (uint) {
    return balances[msg.sender];
  }

  // get bounty info
  function getBounty(uint bountyId) public returns (address owner, uint amount, bool isActive) {
    return (bounties[bountyId].owner, bounties[bountyId].amount, bounties[bountyId].isActive);
  }

  // disburse bounty
  function disburse(uint bountyId, address destAddr) public returns (uint) {
    require(msg.sender == owner, 'not an owner');
    require(bounties[bountyId].isActive == true, 'bounty not active');

    bounties[bountyId].isActive = false;
    balances[bounties[bountyId].owner] -= bounties[bountyId].amount;
    payable(destAddr).transfer(bounties[bountyId].amount);

    emit Completed(bountyId, destAddr, bounties[bountyId].amount);
    return bountyId;
  }
}
