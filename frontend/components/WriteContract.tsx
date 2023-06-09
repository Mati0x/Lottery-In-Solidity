import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useState, useEffect } from "react";
import * as lotteryJson from "../abi/Lottery.json";
import { sepolia } from "wagmi/chains";
import { BigNumber } from "ethers";
import { useBlockNumber } from "wagmi";
import { ethers } from "ethers";

const lotteryContract = {
  address: "0x9492D89Afa756fB89E4E9a5D92B43DF06DB83374",
  abi: lotteryJson.abi,
};

const WriteContract = () => {
  const { data: blockNumber } = useBlockNumber();
  const [duration, setDuration] = useState(100);

  //
  const inputDuration = blockNumber + duration;
  const inputDurationNumber = blockNumber + Number(duration);
  //
  const { write, data, error, isLoading, isError, isSuccess, writeAsync } =
    useContractWrite({
      ...lotteryContract,
      functionName: "openBets",
      args: [inputDurationNumber],
    });

  console.log("block:", blockNumber);
  console.log("input:", inputDuration, typeof inputDuration);
  console.log("input:", inputDurationNumber, typeof inputDurationNumber);

  return (
    <>
      <div className="flex flex-col  min-w-[50%]">
        <h1 className="text-2xl">Write-Contract</h1>
        <h2>Open The Bets:</h2>
        <label>How much duration ?</label>
        <input
          className="p-1 rounded-full ml-8"
          onChange={(e) => setDuration(e.target.value)}
          placeholder="duration in seconds.."
          value={duration}
          type="number"
        />
        <button
          disabled={isLoading}
          className="border-2 border-black w-full mt-2"
          onClick={() => write?.()}
        >
          Open
        </button>
        {isError && <p className="text-sm">{error?.message}</p>}
        {isSuccess && <div>Transaction hash: {data?.hash}</div>}
        {/* <button
          className="border-2 border-black  mt-2"
          onClick={() => closingBets?.()}
        >
          Close
        </button> */}
      </div>
    </>
  );
};
export default WriteContract;
