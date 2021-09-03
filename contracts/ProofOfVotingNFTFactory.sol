pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ProofOfVotingNFT } from "./ProofOfVotingNFT.sol";


/**
 * @notice - This is the factory smart contract of NFT that represents a proof of voting
 */
contract ProofOfVotingNFTFactory {

    address[] public proofOfVotingNFTAddresses;
    mapping (address => address) nftOwners;

    constructor() public {}

    function createNewProofOfVotingNFT() public returns (bool) {
        ProofOfVotingNFT proofOfVotingNFT = new ProofOfVotingNFT();

        address PROOF_OF_VOTING_NFT = address(proofOfVotingNFT);
        proofOfVotingNFTAddresses.push(PROOF_OF_VOTING_NFT);
        nftOwners[PROOF_OF_VOTING_NFT] = msg.sender;
    }


    //----------------
    // Getter methods
    //----------------
    function getCountOfProofOfVotingNFTs(address voter) public view returns (uint _proofOfVotingNFTs) {
        // [Todo]: Return number of NFTs which voter has
    }


}