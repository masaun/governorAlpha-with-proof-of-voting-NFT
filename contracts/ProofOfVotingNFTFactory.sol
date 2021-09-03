pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ProofOfVotingNFT } from "./ProofOfVotingNFT.sol";


/**
 * @notice - This is the factory smart contract of NFT that represents a proof of voting
 */
contract ProofOfVotingNFTFactory {

    address[] public proofOfVotingNFTAddresses;

    constructor() public {}

    function createNewProofOfVotingNFT() public returns (bool) {
        ProofOfVotingNFT proofOfVotingNFT = new ProofOfVotingNFT();
        proofOfVotingNFTAddresses.push(address(proofOfVotingNFT));
    }

}