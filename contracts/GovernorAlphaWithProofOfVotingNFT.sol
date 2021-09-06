pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ProofOfVotingNFT } from "./ProofOfVotingNFT.sol";
import { ProofOfVotingNFTFactory } from "./ProofOfVotingNFTFactory.sol";

import { GovernorAlpha } from "./compound/Governance/GovernorAlpha.sol";


/**
 * @notice - This is the smart contract of NFT that represents a proof of voting
 */
contract GovernorAlphaWithProofOfVotingNFT is GovernorAlpha {

    /// @notice The address of the ProofOfVotingNFTFactory contract
    ProofOfVotingNFTFactory public proofOfVotingNFTFactory;

    constructor(address timelock_, address comp_, address guardian_, address proofOfVotingNFTFactory_) GovernorAlpha(timelock_, comp_, guardian_, proofOfVotingNFTFactory_) public {
        proofOfVotingNFTFactory = ProofOfVotingNFTFactory(proofOfVotingNFTFactory_);
    }

    function castVoteWithProofOfVotingNFT(uint proposalId, bool support) public {
        // Execute castVote method in the GovernorAlpha.sol
        castVote(proposalId, support);

        // [Note]: Mint a proof of voting NFT into a voter's wallet 
        proofOfVotingNFTFactory.createNewProofOfVotingNFT(msg.sender);
        address latestProofOfVotingNFTAddress = proofOfVotingNFTFactory.getLatestProofOfVotingNFTAddress();
        ProofOfVotingNFT proofOfVotingNFT = ProofOfVotingNFT(latestProofOfVotingNFTAddress);
        proofOfVotingNFT.mintProofOfVotingNFTs(msg.sender);
    }

}