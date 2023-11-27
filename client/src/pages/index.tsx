import { contractABI, contractAddress } from "@/lib/contract";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
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
    >
      <div className="grid grid-cols-2 gap-1">
        <div className="w-full flex justify-center h-[90vh]">
          <div className="home-text">
            <h1 className="text-5xl mt-36 font-semibold">
              Crypto Crowdfunding
            </h1>
            <p className="py-4 mr-12">
              Transform ideas into reality with FundMe. Contribute to meaningful causes and support initiatives that make a difference.Embrace the future of philanthropy through decentralized donations
            </p>
            <Link href={"/discover"} className=" p-4 rounded-md bg-primary hover:bg-background hover:text-muted-foreground text-background border border-muted ">
              Donate Now
            </Link>
          </div>
        </div>
        <div className="home-img-2 ">
          <img className="" src="/g10.png" alt="" />
        </div>
        <div className="home-img max-w-lg">
          <img src="/create_form.png" alt="" />
        </div>
        <div className="home-text h-[80vh] mt-40 ml-12">
          <p className="py-4">
            Embark on a journey of innovation with FundMe. Contribute to shape the future, where groundbreaking ideas meet decentralized support, unlocking limitless possibilities for creators and backers alike
          </p>
          <Link href={"/create-fundraiser"} className=" p-4 rounded-md bg-primary hover:bg-background hover:text-muted-foreground text-background border border-muted">
            Create Campaign
          </Link>
        </div>
        <div className="home-text mt-40 mr-16">
          <p className="py-4">
            Experience the simplicity of our crypto crowdfunding platform. Create a campaign, attract global backers with cryptocurrency contributions, and watch your vision come to life through decentralized funding
          </p>
          <Link href={"/how-it-works"} className=" p-4 rounded-md bg-primary hover:bg-background hover:text-muted-foreground text-background border border-muted">
            How it works
          </Link>
        </div>
        <div className="home-img">
          <img className="max-w-lg" src="/hiw.png" alt="" />
        </div>






      </div>

    </main >
  );
}
