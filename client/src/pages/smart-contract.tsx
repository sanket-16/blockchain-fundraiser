import { contractABI, contractAddress } from "@/lib/contract";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useContractRead, useContractWrite, useWalletClient } from "wagmi";

type Tweets = {
  author: string;
  content: string;
  likes: number;
  timestamp: Date;
}[];

const SmartContract = () => {
  const [enable, setEnable] = useState(false);
  const [tweet, setTweet] = useState("");
  const [contractData, setContractData] = useState<Tweets>();
  // const { data: session, status } = useSession();
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
    args: [tweet],
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: data2,
    refetch,
    status: contractStatus,
    isFetching,
    isRefetching,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTweets",
    account: walletClient?.account.address,
    args: [walletClient?.account.address],
    enabled: walletLoaded,
  });

  useEffect(() => {
    setContractData(data2 as Tweets);
  }, [isFetching, isRefetching, contractStatus]);
  console.log(isSuccess, data, variables);
  console.log(data2);

  return (
    <div className="py-4">
      <h3 className="text-2xl font-bold text-center">Smart Contract Demo</h3>
      <div className="py-4 flex flex-col gap-2">
        <label htmlFor="content">Content</label>
        <textarea
          className="p-4 border border-muted rounded-md bg-transparent w-full"
          name="content"
          placeholder="Enter content..."
          required
          onChange={(event) => setTweet(event.target.value)}
          value={tweet}
        />
        <button
          className="p-4 rounded-md border border-muted hover:bg-secondary"
          onClick={() => {
            writeAsync();
          }}
        >
          Send Tweet
        </button>
      </div>
      <div className="flex flex-col w-full gap-4">
        {contractData?.map((tweet, index) => (
          <div
            key={index}
            className="p-4 rounded-md border-2 border-muted flex gap-4 flex-col"
          >
            <p className="text-sm text-foreground/50 font-bold">
              {tweet.author}
            </p>
            <p>{tweet.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartContract;
