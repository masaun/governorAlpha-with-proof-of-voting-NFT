pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";

import { Comp } from "./compound/Governance/COMP.sol";
//import { ProofOfVotingNFT } from "./ProofOfVotingNFT.sol";
import { ProofOfVotingNFTFactory } from "./ProofOfVotingNFTFactory.sol";


/**
 * @notice - This is the smart contract of the Rewards Vault
 */
contract RewardsVault {
    using SafeMath for uint256;

    Comp public comp;
    ProofOfVotingNFTFactory public proofOfVotingNFTFactory;

    uint DISTRIBUTION_AMOUNT = 1e16;  // 0.01 COMP 

    constructor(Comp _comp, ProofOfVotingNFTFactory _proofOfVotingNFTFactory) public {
        comp = _comp;
        proofOfVotingNFTFactory = _proofOfVotingNFTFactory;
    }

    /**
     * @notice - Change the distribution amount
     */
    function changeDistributionAmount(uint newDepositionAmount) public {
        DISTRIBUTION_AMOUNT = newDepositionAmount;
    }

    /**
     * @notice - Deposit some COMP tokens into the this contract (Rewards Vault)
     */
    function depositRewardToken(uint depositAmount) public {
        comp.transferFrom(msg.sender, address(this), depositAmount);
    }

    /**
     * @notice - Distribute rewards (COMP Tokens) into voters (wallets) depends on number of NFTs that each voters has.
     */ 
    function distributeRewardToken(address voter) public {
        // Count NFTs
        uint countOfProofOfVotingNFTs = proofOfVotingNFTFactory.getCountOfProofOfVotingNFTs(voter);

        // Calculate distributed-amount
        uint distributionAmount = DISTRIBUTION_AMOUNT.mul(countOfProofOfVotingNFTs);

        comp.transfer(voter, distributionAmount);
    }


    //-----------------
    // Getter methods
    //-----------------
    function getDistributionAmount() public view returns (uint _currentDistributionAmount) {
        return DISTRIBUTION_AMOUNT;
    }
}