import { useContractWrite } from "wagmi";
import { useState } from "react";
import * as lotteryJson from "../abi/Lottery.json";
import { sepolia } from "wagmi/chains";

const WriteContract = () => {
  const [duration, setDuration] = useState("0");
  const { write, data, error, isLoading, isError, isSuccess } =
    useContractWrite({
      address: "0xCbB4197d5B7d6aDbD76269783FEbF98CDCe6e941",
      abi: lotteryJson.abi,
      functionName: "openBets",
      args: [duration],
      chainId: sepolia.id,
      gas: 1_000_000n,
    });

  return (
    <>
      <h1 className="text-2xl">WriteContract</h1>
      <h2>Open The Bets:</h2>
      <label>How much duration ?</label>
      <input
        onChange={(e) => setDuration(e.target.value)}
        placeholder="duration in seconds.."
        value={duration}
        type="string"
      />
      <button
        disabled={isLoading}
        className="border-2 border-black"
        onClick={() => write({ args: [duration] })}
      >
        Open
      </button>
      {isError && <p className="text-sm">{error?.message}</p>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </>
  );
};
export default WriteContract;
