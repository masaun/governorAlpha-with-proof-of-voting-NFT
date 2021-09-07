# 【GovernorAlpha with Proof of Voting NFT】
## 【Introduction of the GovernorAlpha with Proof of Voting NFT】
- This is the smart contract that incentivize voters (of compound) by using the proof of voting NFTs. 
  - Once a token holder (of COMP) execute voting, that token holder receive a NFT as a proof of voting.
  - As a incentive to keep engaging in voting, token holders who has voting NFTs can receive rewards regularly.

<br>

- This smart contract try to solve current disadvantage of on-chain voting that:
  - Token holders (of COMP) need to pay GasFee⛽️ for every voting. (In case token holders vote by themself)
  - Small share holders (of COMP) has less voting power than large share holders.
    ↓
    - By distributing rewards via this smart contract like above, all token holders (of COMP) can get benefit to engage in voting even if they are small share holders (of COMP).

<br>

&nbsp;

***

## 【Workflow】
- Workflow
  - ① Create a proposal (from voters to the GovernorAlphaWithProofOfVotingNFT contract).
  - ② Create a proposal (from the GovernorAlphaWithProofOfVotingNFT contract to the GovernorAlpha contract).  
    => Workflow of ① and ② above are execute via the GovernorAlphaWithProofOfVotingNFT contract in a single transaction.  
  - ③ Cast a vote (from voters to the GovernorAlphaWithProofOfVotingNFT contract).  
  - ④ Cast a vote (from the GovernorAlphaWithProofOfVotingNFT contract to the GovernorAlpha contract).  
    => Workflow of ③ and ④ above are execute via the GovernorAlphaWithProofOfVotingNFT contract in a single transaction.  
  - ⑤ Create a new `proof of voting NFT` .
  - ⑥ Mint a proof of voting NFT.
  - ⑦ Transfer a proof of voting NFT to voter who is voted.
  - ⑧ Distribute reward tokens (COMP) `based on number of a proof of voting NFTs` .
    - On the assumption that, 1 proof of voting NFT is given to voter per 1 vote . 
    - On the assumption that, default `reward distribution amount` is `0.01` COMP.
      https://github.com/masaun/governorAlpha-with-proof-of-voting-NFT/blob/main/contracts/RewardsVault.sol#L20
      (※ the reward distribution amount can be changed by using `changeDistributionAmount` method in the RewardsVault.sol: https://github.com/masaun/governorAlpha-with-proof-of-voting-NFT/blob/main/contracts/RewardsVault.sol#L30-L32 )

    - e.g). If some voter vote 2 different proposal, that voter receive 2 proof of voting NFTs.  
      => In case of that, that voter receive `0.02 COMP (=0.01 * 2 NFTs)` regulary.

    - Remarks). 
      - At the moment, the `manual` distribution method has been implemented already. ( https://github.com/masaun/governorAlpha-with-proof-of-voting-NFT/blob/main/contracts/RewardsVault.sol#L44-L52 )
      - But, the `reqular` distribution method has not been implemented yet.

<br>

- Diagram of workflow: 
  ![【Decentralized Governance Hack🌍Compound】GovernorAlpha with Proof of Voting NFT](https://user-images.githubusercontent.com/19357502/132422614-0ea3a4f5-9782-4a1b-937f-a276322e5413.jpg)

<br>

- The `GovernorAlphaWithProofOfVotingNFT.sol` inherit the `GovernorAlpha.sol of Compound` .
  https://github.com/masaun/governorAlpha-with-proof-of-voting-NFT/blob/main/contracts/GovernorAlphaWithProofOfVotingNFT.sol

&nbsp;

***

## 【Remarks】
- Versions:
  - Solidity (Solc): v0.5.16
  - Hardhat: v2.6.1
  - ether.js: v5.4.6
  - web3.js: v1.5.2
  - @openzeppelin/contracts: v2.5.1

&nbsp;

***

## 【Setup】
### ① Install modules
- Install npm modules in the root directory
```
npm install
```

<br>

### ② Compile contracts
```
npm run compile
```

<br>

&nbsp;

***

## 【Unit test】
- Scenario test
```
npm run test:Scenario.test.js
```

<br>

&nbsp;

***

## 【Demo】
- Demo video of unit test  
  https://youtu.be/pr0gk1njwHk

<br>

&nbsp;

***

## 【References】
- [Compound.finance]
  - compound-protocol/contracts/Governance: https://github.com/compound-finance/compound-protocol/tree/master/contracts/Governance
  - compound-protocol/tests/Governance: https://github.com/compound-finance/compound-protocol/tree/master/tests/Governance

<br>

- [Tally]
  - Tutorial-Deploy-Governance: https://github.com/withtally/Tutorial-Deploy-Governance

<br>

- [Prize]: 
  - Most Innovative Use Of Compound's Governance Contracts  
    https://gitcoin.co/issue/compoundgrants/hackathon/1/100026405
