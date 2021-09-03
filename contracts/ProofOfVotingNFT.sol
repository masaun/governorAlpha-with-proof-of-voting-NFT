pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import { ERC721Full } from "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import { Counters } from "@openzeppelin/contracts/drafts/Counters.sol";

/**
 * @notice - This is the smart contract of NFT that represents a proof of voting
 */
contract ProofOfVotingNFT is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721Full("Proof of voting NFT", "POV") public {}

    function getCountOfProofOfVotingNFTs(address voter) public view returns (uint _proofOfVotingNFTs) {
        // [Todo]: Return number of NFTs which voter has
    }

    function mintProofOfVotingNFTs(address voter) public returns (uint256) {
        _tokenIds.increment();

        uint256 newNftId = _tokenIds.current();
        _mint(voter, newNftId);

        return newNftId;
    }

}