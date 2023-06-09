import React from "react";
import { useState } from "react";
import type { Address } from "wagmi";
import { useContractRead } from "wagmi";
import * as lotteryJson from "../abi/Lottery.json";
import { ethers } from "ethers";
import { useBlockNumber } from "wagmi";

const lotteryContract = {
  address: "0x9492D89Afa756fB89E4E9a5D92B43DF06DB83374",
  abi: lotteryJson.abi,
};

const ReadContract = () => {
  const { data: betsOpen } = useContractRead({
    ...lotteryContract,
    functionName: "betsOpen",
    watch: true,
  });
  const { data: owner } = useContractRead({
    ...lotteryContract,
    functionName: "owner",
  });
  const { data: betFee } = useContractRead({
    ...lotteryContract,
    functionName: "betFee",
  });
  const { data: purchaseRatio } = useContractRead({
    ...lotteryContract,
    functionName: "purchaseRatio",
  });
  const { data: closingTime } = useContractRead({
    ...lotteryContract,
    functionName: "betsClosingTime",
    watch: true,
  });
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const currentBlockDate = new Date(blockNumber * 1000);

  const BET_FEE = betFee?.toString().slice(0, 2);
  const PURCHASE_RATIO = purchaseRatio?.toString();

  const blockClosingTme = closingTime?.toString();

  return (
    <>
      <div className="max-w-[50%] space-y-3">
        <h1 className="text-2xl">Read-Contract</h1>
        <h2>The owner of this contract is: {owner}</h2>
        <h2>Bets are currently {betsOpen ? "open" : "closed"}</h2>
        {<h2>The bet fee is {BET_FEE} %</h2>}
        {<h2>The purchase ratio is {PURCHASE_RATIO}</h2>}
        {<h2>CurrentBlock: {blockNumber}</h2>}
        {<h2>Block Closing bets: {blockClosingTme}</h2>}
        {/* {<h2>Block closing Time {closingTime}</h2>} */}
        {
          <h2>
            The Last block was mined at {currentBlockDate.toLocaleTimeString()}
          </h2>
        }
      </div>

      {/* <h2>The prize pool is {prizePool?}</h2> */}
    </>
  );
};

export default ReadContract;
