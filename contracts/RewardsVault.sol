pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { Comp } from "./compound/Governance/COMP.sol";
//import { ProofOfVotingNFT } from "./ProofOfVotingNFT.sol";
import { ProofOfVotingNFTFactory } from "./ProofOfVotingNFTFactory.sol";


/**
 * @notice - This is the smart contract of the Rewards Vault
 */
contract RewardsVault {

    Comp public comp;
    ProofOfVotingNFTFactory public proofOfVotingNFTFactory;

    constructor(Comp _comp, ProofOfVotingNFTFactory _proofOfVotingNFTFactory) public {
        comp = _comp;
        proofOfVotingNFTFactory = _proofOfVotingNFTFactory;
    }

    /**
     * @notice - Deposit some COMP tokens into the this contract (Rewards Vault)
     */
    function depositRewardToken(uint depositedAmount) public {
        comp.transferFrom(msg.sender, address(this), depositedAmount);
    }

    /**
     * @notice - Distribute rewards (COMP Tokens) into voters (wallets) depends on number of NFTs that each voters has.
     */ 
    function distributeRewardToken(address voter, uint distributedAmount) public {
        // Count NFTs
        uint countOfProofOfVotingNFTs = proofOfVotingNFTFactory.getCountOfProofOfVotingNFTs(voter);
        
        comp.transfer(voter, distributedAmount);
    }
}