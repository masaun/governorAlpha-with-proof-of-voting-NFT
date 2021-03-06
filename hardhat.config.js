require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3")     /// [NOTE]: For using web3.js + @openzeppelin/test-helpers on Hardhat
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("Deploy", "Deploys a COMPound style governance system")
.addParam("token", "The address to receive the initial supply")
.addParam("timelock", "The timelock administrator")
.addParam("guardian", "The governor guardian").setAction(async taskArgs => {
    
  const { deploy } = require("./scripts/Deploy");

    await deploy({
      tokenRecipient: taskArgs.token,
      timeLockAdmin: taskArgs.timelock,
      guardian: taskArgs.guardian
    });

})


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // forking: {
      //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`
      //   //blockNumber: 11589707
      // }
    },
    local: {
      url: "http://127.0.0.1:8545"
    },
    // rinkeby: {
    //   url: "https://rinkeby.infura.io/v3/<<Your infura Key>>",
    //   accounts: ["0xAPrivateKey"]
    // }
  },
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {},
      },
      // {
      //   version: "0.8.4",
      //   settings: {},
      // },
      // {
      //   version: "0.8.6",
      //   settings: {},
      // }
    ],
  },  

};

