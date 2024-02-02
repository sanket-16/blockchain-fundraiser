import { ethers } from "hardhat";

const main = async () => {
  // const twitter = await ethers.deployContract("Twitter");
  const FundMe = await ethers.deployContract("FundMe");

  // await twitter.waitForDeployment();
  await FundMe.waitForDeployment();

  // const twitterAddress = await twitter.getAddress();
  const FundMeAddress = await FundMe.getAddress();
  console.log("FundMe Contract Deployed at: ", FundMeAddress);
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
