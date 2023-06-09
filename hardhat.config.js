require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts","List the accounts",async(taskArg,hre)=>{
  const accounts= await hre.ethers.getSigners();
  //console.log("log",hre);
  //nconsole.log("ethers", hre.ethers);

  for(const account of accounts){
    console.log(account.address);
  }
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
