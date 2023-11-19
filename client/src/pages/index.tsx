import Navbar from "@/components/Navbar";
import { contractABI, contractAddress } from "@/lib/contract";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useContractRead, useContractWrite, useWalletClient } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [enable, setEnable] = useState(false);
  const { data: session, status } = useSession();
  const {
    data: walletClient,
    isLoading,
    isSuccess: walletLoaded,
    isError,
  } = useWalletClient();
  const { data, writeAsync, isSuccess, variables } = useContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "createTweet",
    account: walletClient?.account.address,
    args: ["hiii"],
  });

  const { data: data2 } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTweets",
    account: walletClient?.account.address,
    args: [walletClient?.account.address],
    enabled: walletLoaded,
  });

  console.log(isSuccess, data, variables);
  console.log(data2);
  return (
    <main
      className={`flex  min-h-screen flex-col px-24 py-8 ${inter.className} `}
    ></main>
  );
}
