import React from "react";
import { useState } from "react";
import type { Address } from "wagmi";
import { useContractRead } from "wagmi";
import * as lotteryJson from "../abi/Lottery.json";
import { ethers } from "ethers";

const lotteryContract = {
  address: "0xCbB4197d5B7d6aDbD76269783FEbF98CDCe6e941",
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

  const BET_FEE = betFee?.toString().slice(0, 2);
  const PURCHASE_RATIO = purchaseRatio?.toString();

  console.log(betsOpen);
  return (
    <>
      <h1 className="text-2xl">ReadContract</h1>
      <h2>The owner of this contract is {owner}</h2>
      <h2>Bets are currently {betsOpen ? "open" : "closed"}</h2>
      {<h2>The bet fee is {BET_FEE} %</h2>}
      {<h2>The purchase ratio is {PURCHASE_RATIO}</h2>}

      {/* <h2>The prize pool is {prizePool?}</h2> */}
    </>
  );
};

export default ReadContract;
