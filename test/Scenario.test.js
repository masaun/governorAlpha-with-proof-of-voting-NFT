const { expect } = require("chai")

const {
  encodeParameters,
  etherUnsigned,
  freezeTime,
  keccak256
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
            console.log('=== txReceipt of comp.transfer() ===', txReceipt2)
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
            const targets = [voter1]
            const values = ["100001"]  // Proposal should be created by voter who has more than 100,000 Comp = 1% of Comp
            const signatures = ["getBalanceOf(address)"]
            const calldatas = [encodeParameters(['address'], [voter1])]
            const description = "This is a test proposal."

            let txReceipt1 = await comp.delegate(voter1)

            /// [Error]: "GovernorAlpha::propose: proposer votes below proposal threshold"
            let txReceipt2 = await governorAlpha.propose(targets, values, signatures, calldatas, description)
        })

        it("Cast voting and distribute NFTs into voters (wallets)", async function() {})
    })


    ///---------------------------------
    ///  Rewards distribution process
    ///---------------------------------
    describe("Rewards distribution process", function() {
        it("Distribute rewards (COMP Tokens) into voters (wallets) depends on number of NFTs that each voters has ", async function() {})
    })

})
