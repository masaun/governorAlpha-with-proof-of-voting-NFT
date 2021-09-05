/// Openzeppelin test-helper
const { time, constants, expectRevert, expectEvent } = require('@openzeppelin/test-helpers')

/// web3.js related methods
const { toWei, fromWei, getEvents, getCurrentBlock, getCurrentTimestamp, getLatestBlock, advanceBlock, advanceBlockTo } = require('./web3js-helper/web3jsHelper')

const { expect } = require("chai")

const {
  address,
  etherMantissa,
  encodeParameters,
  mineBlock,
  unlockedAccount,
  etherUnsigned,
  freezeTime,
  keccak256,
  blockNumber
} = require('./Utils/Ethereum')

const oneWeekInSeconds = etherUnsigned(7 * 24 * 60 * 60)

/**
 * @notice - This is the test of whole scenario
 */ 
describe("Scenario test", function() {

    /// Accounts
    let accounts
    let guardian, deployer, voter1, voter2, voter3

    /// Contract instance
    let Timelock, timelock, TIMELOCK
    let Comp, comp, COMP
    let GovernorAlpha, governorAlpha, GOVERNOR_ALPHA

    describe("Deploy smart contracts", function() {
        it("Assign accounts", async function() {
            accounts = await hre.ethers.getSigners()
            guardian = accounts[0].address
            deployer = accounts[0].address
            voter1 = accounts[1].address
        })

        it("Deploy the Timelock.sol", async function() {
            const admin = deployer
            const delay = String(oneWeekInSeconds)
            console.log('=== delay ===', delay)

            Timelock = await ethers.getContractFactory("Timelock")
            timelock = await Timelock.deploy(admin, delay)
            TIMELOCK = timelock.address 
        })

        it("Deploy the Comp.sol", async function() {
            const account = deployer

            Comp = await ethers.getContractFactory("Comp")
            comp = await Comp.deploy(account)
            COMP = comp.address
        })

        it("Deploy the ProofOfVotingNFTFactory.sol", async function() {
            ProofOfVotingNFTFactory = await ethers.getContractFactory("ProofOfVotingNFTFactory")
            proofOfVotingNFTFactory = await ProofOfVotingNFTFactory.deploy()
            PROOF_OF_VOTING_NFT_FACTORY = proofOfVotingNFTFactory.address
        })

        it("Deploy the GovernorAlpha.sol", async function() {
            GovernorAlpha = await ethers.getContractFactory("contracts/compound/Governance/GovernorAlpha.sol:GovernorAlpha")
            governorAlpha = await GovernorAlpha.deploy(TIMELOCK, COMP, guardian, PROOF_OF_VOTING_NFT_FACTORY)
            GOVERNOR_ALPHA = governorAlpha.address
        })
    })

    describe("Check status before scenario test is started", function() {
        it("Should return the Comp balance", async function() {
            let _compBalance = await comp.balanceOf(deployer)
            let compBalance = ethers.utils.formatEther(String(_compBalance))
            console.log('=== Comp balance of deployer ===',  compBalance) // fromETH
            expect(compBalance).to.equal("10000000.0")  /// 10,000,000 COMP
        })

        it("Should return the Comp balance", async function() {
            const dst = voter1
            const rawAmount = ethers.utils.parseEther('400001')  /// 400001 COMP
            let txReceipt2 = await comp.transfer(dst, rawAmount)
            //console.log('=== txReceipt of comp.transfer() ===', txReceipt2)
        })
    })


    ///-----------------------------------------
    /// General process (propose - cast voting)
    ///-----------------------------------------
    describe("General process (propose - cast voting)", function() {
        it("Comp balance of voter1 should be 400001 COMP", async function() {
            let _compBalance = await comp.balanceOf(voter1)
            let compBalance = ethers.utils.formatEther(String(_compBalance))
            console.log('=== Comp balance of deployer ===',  compBalance) // fromETH
            expect(compBalance).to.equal("400001.0")  /// 400,001 COMP
        })

        it("Propose a proposal", async function() {
            const targets = [deployer]
            //const values = ["0"]
            const values = ["400001"]  // Proposal should be created by voter who has more than 400,001 Comp = 24.9% of Comp (totalSupply of Comp is 10 million Comp / 400,001 Comp)
            const signatures = ["getBalanceOf(address)"]
            const calldatas = [encodeParameters(['address'], [deployer])]
            const description = "This is a test proposal."

            let txReceipt1 = await comp.delegate(deployer)
            let txReceipt2 = await governorAlpha.propose(targets, values, signatures, calldatas, description)
            //console.log('=== txReceipt2 which is governorAlpha.propose() ===',  txReceipt2)            

            /// [Todo]: Get event log
            //let proposalId = await getEvents(governorAlpha, "ProposalCreated")
            //console.log('=== proposalId created ===',  proposalId)
        })

        it("Cast voting and distribute NFTs into voters (wallets)", async function() {
            /// [Problem]: Returned-value is empty
            //let latestBlock = await time.latestBlock()
            let latestBlock = await getLatestBlock()
            console.log('=== latestBlock (before advanceBlock) ===', String(latestBlock))
            await advanceBlockTo(latestBlock + 11520)  /// [NOTE]: Voting period is "~3 days" in blocks (assuming 15s blocks). This is in case of voting at 2 days (11520 blocks)

            console.log('=== latestBlock (after advanceBlock) ===', String(latestBlock))

            const proposalId = 1  // [Todo]: Replace proposalId which is retrieved via an event log
            const support = false
            
            /// [Error]: "GovernorAlpha::_castVote: voting is closed"
            let txReceipt = await governorAlpha.castVote(proposalId, support)
        })
    })


    ///---------------------------------
    ///  Rewards distribution process
    ///---------------------------------
    describe("Rewards distribution process", function() {
        it("Distribute rewards (COMP Tokens) into voters (wallets) depends on number of NFTs that each voters has ", async function() {})
    })

})
