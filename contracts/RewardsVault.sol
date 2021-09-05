pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { Comp } from "./compound/Governance/COMP.sol";


/**
 * @notice - This is the smart contract of the Rewards Vault
 */
contract RewardsVault {

    Comp public comp;

    constructor(Comp _comp) public {
        comp = _comp;
    }

    /**
     * @notice - Deposit some COMP tokens into the this contract (Rewards Vault)
     */
    function depositRewardToken(uint depositedAmount) public {
        // [Note]: In advance, msg.sender need to approve to transfer COMP
        comp.transferFrom(msg.sender, address(this), depositedAmount);
    }

    /**
     * @notice - Distribute rewards (COMP Tokens) into voters (wallets) depends on number of NFTs that each voters has.
     */ 
    function distributeRewardToken(address voter, uint distributedAmount) public {
        // [Todo]: Add a method for counting NFTs

        comp.transfer(voter, distributedAmount);
    }
}