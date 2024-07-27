// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GAOrganization {
 // point to erc20 contract
    IERC20 token;
    // structure for a single stake holder
    struct StakeHolder {
        bool isWaitListed;
        uint256 vestingPeriod;
        uint256 amount;
    }
    // mapping of different stake holders
    mapping (address => StakeHolder) public stake_holders;
    // admin address that incharge of this contract (this can be DAO to maintain Decentralization)
    address admin;
    // Log events base on staking and withdrawal
    event LogEvent(address stake_holder, uint256 amount);

    // assign an admin address on deployment
    constructor(address _owner, IERC20 _token){
        admin = _owner;
        token = _token;
    }

    function addStakeHolder(address _stake_holder, uint256 _amount, uint256 _vestingPeriod) external {
        require(admin == msg.sender, "Only the admin is allowed to call this function");
        stake_holders[_stake_holder] = StakeHolder({
            amount: _amount,
            isWaitListed: true,
            vestingPeriod: _vestingPeriod
        });
        
        emit LogEvent(_stake_holder, _amount);
    }

    function withdraw() external {
        StakeHolder memory stakeholder = stake_holders[msg.sender];
        require(stakeholder.isWaitListed == true, "You have not been waitlisted");
        require(stakeholder.vestingPeriod < block.timestamp, "Vesting period not yet due!");
        require(stakeholder.amount > 0, "No enough funds");
        
        uint256 amount = stakeholder.amount;

        token.transferFrom(admin, msg.sender, amount);

        emit LogEvent(msg.sender, amount);
        stakeholder.amount = 0;
        stakeholder.isWaitListed = false;
    }
    // admin 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    // stakeholder 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
}