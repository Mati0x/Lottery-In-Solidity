import { ethers } from "hardhat";
import * as readline from "readline";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  Lottery,
  LotteryToken,
  Lottery__factory,
  LotteryToken__factory,
} from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1;
let token: LotteryToken;

async function main() {
  console.log("DEPLOYER PRIVATE_KEY");
  console.log(process.env.DEPLOYER_PRIVATE_KEY);
  const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY ?? "");
  const provider = new ethers.providers.InfuraProvider(
    "sepolia",
    process.env.INFURA_API_KEY
  );

  const lastBlock = await provider?.getBlock("latest");
  console.log(`Connected to the blocknumber ${lastBlock?.number}`);

  const signer = wallet.connect(provider);
  const myLotteryFactory = new Lottery__factory(signer);
  const myLotterycontract = await myLotteryFactory.deploy(
    "LotteryToken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );

  const deployLotteryontractTxReceipt =
    await myLotterycontract.deployTransaction.wait();
  console.log(`The contract Lottery was deployed at address ${myLotterycontract.address} at the block 
  ${deployLotteryontractTxReceipt.blockNumber} \n`);

  const myLotteryTokenFactory = new LotteryToken__factory(signer);
  const myLotteryTokencontract = await myLotteryTokenFactory.deploy(
    "LotteryToken",
    "LT0"
  );

  const deployLotteryTokenContractTxReceipt =
    await myLotteryTokencontract.deployTransaction.wait();
  console.log(`The contract LotteryToken was deployed at address ${myLotteryTokencontract.address} at the block 
  ${deployLotteryTokenContractTxReceipt.blockNumber} \n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
