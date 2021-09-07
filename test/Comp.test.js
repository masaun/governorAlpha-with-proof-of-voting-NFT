const { expect } = require("chai")

describe("Comp", function() {

    /// Accounts
    let accounts
    let deployer

    /// Contract instance
    let Comp, comp

    it("Assign accounts", async function() {
        accounts = await hre.ethers.getSigners()
        deployer = accounts[0].address
        user1 = accounts[1].address
    })

    it("Deploy the Comp.sol", async function() {
        const account = deployer

        Comp = await ethers.getContractFactory("Comp")
        comp = await Comp.deploy(account)    
    })

    it("Should return the Comp balance", async function() {
        let _compBalance = await comp.balanceOf(deployer)
        let compBalance = ethers.utils.formatEther(String(_compBalance))
        console.log('=== Comp balance of deployer ===',  compBalance) // fromETH
        expect(compBalance).to.equal("10000000.0")  /// 10,000,000 COMP
    })

    it("Should return the Comp balance", async function() {
        const dst = user1
        const rawAmount = ethers.utils.parseEther('2000')  /// 2000 COMP

        //let txReceipt1 = await comp.approve(dst, rawAmount).connect(deployer)
        //let txReceipt2 = await comp.transfer(dst, rawAmount).connect(deployer)
        let txReceipt2 = await comp.transfer(dst, rawAmount)
        //console.log('=== txReceipt of comp.transfer() ===', txReceipt2)
    })

})
