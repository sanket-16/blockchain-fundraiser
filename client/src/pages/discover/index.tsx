import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import FilterNav from "@/components/FilterNav";
import Card from "@/components/CampaignCard";
// import getAllCampaigns from "@/lib/api/campaigns/getAll";
import { constAbi, contractABI, contractAddress } from "@/lib/contract";
import { useContractRead } from "wagmi";
import { X } from "lucide-react";

const CampaignPage = () => {
  const [category, setCategory] = useState("");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { data, status } = useContractRead({
    abi: constAbi,
    functionName: "getCampaigns",
    address: contractAddress,
  });
  // const { data, status } = useQuery({
  //   queryKey: ["get campaigns"],
  //   queryFn: () => getAllCampaigns(),
  // });
  console.log(data);

  return (
    <div className=" max-w-6xl p-8">
      {isClient ? (
        <>
          <FilterNav category={category} setCategory={setCategory} />
          <div className="pt-4">
            {" "}
            {category !== "" && (
              <span
                className="py-2 px-4 rounded-md bg-muted text-md font-bold flex gap-4 w-fit hover:cursor-pointer"
                onClick={() => setCategory("")}
              >
                {category} <X />
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-4">
            {status === "error" && (
              <p>Something went wrong, Please try again!</p>
            )}
            {status === "loading" && (
              <>
                <div className="w-full h-80 animate-pulse bg-secondary rounded-md" />
                <div className="w-full h-80 animate-pulse bg-secondary rounded-md" />
                <div className="w-full h-80 animate-pulse bg-secondary rounded-md" />
                <div className="w-full h-80 animate-pulse bg-secondary rounded-md" />
                <div className="w-full h-80 animate-pulse bg-secondary rounded-md" />
              </>
            )}
            {category === ""
              ? data?.map((campaign) => (
                  <Card key={campaign.id} {...campaign} />
                ))
              : data
                  ?.filter((campaign) => campaign.category === category)
                  .map((campaign) => <Card key={campaign.id} {...campaign} />)}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CampaignPage;
