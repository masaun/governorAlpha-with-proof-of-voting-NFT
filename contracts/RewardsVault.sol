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

}