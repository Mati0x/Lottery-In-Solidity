import React from "react";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead,
  useBalance,
  useBlockNumber,
  useAccount,
  useConnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import * as lotteryJson from "../abi/Lottery.json";
import * as testABI from "../abi/TestData.json";
import { ethers } from "ethers";
import { useIsMounted } from "../hooks/useIsMounted";

const Contract = () => {
  const isMounted = useIsMounted();
  const { address, isConnecting, isDisconnected } = useAccount({});
  const { data: balance } = useBalance({
    address: address,
  });
  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  return (
    <>
      <div className="border-2">
        <div>
          {isMounted ? (
            address && <p className="text-2xl">Your address: {address}</p>
          ) : (
            <p className="text-2xl">Loading...</p>
          )}
        </div>
      </div>
      <div className="border-2">
        {isMounted ? (
          balance && <p>Balance: {balance?.formatted}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="border-2">
        <p>Block Number: {blockNumber?.toString()}</p>
      </div>
    </>
  );
};

export default Contract;
