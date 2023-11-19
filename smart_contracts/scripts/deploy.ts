import { ethers } from "hardhat";

const main = async () => {
  const twitter = await ethers.deployContract("Twitter");

  await twitter.waitForDeployment();

  const twitterAddress = await twitter.getAddress();
  console.log("Twitter Contract Deployed at: ", twitterAddress);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

runMain();
