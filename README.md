# 【GovernorAlpha with Proof of Voting NFT】
## 【Introduction of the GovernorAlpha with Proof of Voting NFT】
- This is the smart contract that incentivize voters (of compound) by using the proof of voting NFTs. 
  - Once a token holder execute voting, that token holder receive a NFT as a proof of voting.
  - As a incentive for engagement of voting, token holders who has voting NFTs can get rewards regularly.

<br>

- This smart contract try to solve current disadvantage of on-chain voting (especially for small share holders) is that:
  - Token holders need to pay GasFee⛽️ for every voting.
  - Small share holder has less voting power than large share holders.

<br>

&nbsp;

***

## 【Workflow】
- Diagram of workflow: 
  ![【Diagram】GovernorAlpha with Proof of Voting NFT](https://user-images.githubusercontent.com/19357502/132271835-bae0f317-533b-40e9-9f7c-9613069066b9.jpg)

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
  https://~~~

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
