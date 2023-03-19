const main = async () => {
        const [owner, randomPerson] = await hre.ethers.getSigners();
        const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
        const waveContract = await waveContractFactory.deploy();
        waveContract.deployed();
        console.log("Contract deployed to: ", waveContract.address);
        console.log("Contract deployed by: ", owner.address);

        await waveContract.getTotalWaves();
        const waveTrxn= await waveContract.wave();
        await waveTrxn.wait();

        await waveContract.getTotalWaves();

        const secondWave=await waveContract.connect(randomPerson).wave();
        await secondWave.wait();

        await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
/**
 * Running on temporary local ethereum blockchain 
 */
runMain();
