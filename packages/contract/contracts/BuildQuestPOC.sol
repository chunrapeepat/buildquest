// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BuildQuestPOC {
  address payable owner;
  mapping(address => uint) public balances;
  uint bountyId = 1;
  // mapping bounty id to bounty struct
  struct bounty_struct {
    address owner;
    uint amount;
    bool isActive;
  }
  mapping(uint => bounty_struct) public bounties;

  // init owner
  constructor() public {
    owner = payable(msg.sender);
  }
  modifier onlyOwner() {
    require(msg.sender == owner, 'not an owner');
    _;
  }

  // create bounty function
  event Created(address owner, uint bountyId, uint amount);
  function createBounty() public payable returns (uint) {
    require(msg.value > 0, 'value must > 0');

    uint id = bountyId++;
    balances[msg.sender] += msg.value;
    bounties[id] = bounty_struct(msg.sender, id, true);

    emit Created(msg.sender, id, msg.value);

    return id;
  }

  // close bounty function
  event Closed(address owner, uint bountyId, uint amount);
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
  event Completed(uint bountyId, address receiver, uint amount);
  function disburse(uint bountyId, address receiver) public onlyOwner returns (uint) {
    require(bounties[bountyId].isActive == true, 'bounty not active');

    bounties[bountyId].isActive = false;
    balances[msg.sender] -= bounties[bountyId].amount;
    payable(receiver).transfer(bounties[bountyId].amount);

    emit Completed(bountyId, receiver, bounties[bountyId].amount);
    return bountyId;
  }
}
