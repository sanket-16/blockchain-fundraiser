import CampaignCard, { UserCampaignCard } from "@/components/CampaignCard";
import { getUserWaitingCampaigns } from "@/lib/api/campaigns/waiting";
// import getProfile, { User } from "@/lib/api/admin-auth";
import { constAbi, contractAddress } from "@/lib/contract";
import { WeiPerEther } from "ethers";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAccount, useBalance, useContractReads } from "wagmi";
import type { Campaign as DBCampaign } from "@prisma/client";
import { getUserApprovedCampaigns } from "@/lib/api/campaigns/approved";
const config = {
  address: contractAddress as `0x${string}`,
  abi: constAbi,
};
const Profile = () => {
  // const { data, status } = useSession();
  const { address, isConnected, status } = useAccount();
  const { data: walletData, status: walletStatus } = useBalance({
    address: address,
  });
  const { data: waitingCampaigns, status: waitingCampaignsStatus } = useQuery({
    queryKey: ["waiting campaigns"],
    queryFn: () => getUserWaitingCampaigns(String(address)),
    enabled: status === "connected",
  });
  const { data: approvedCampaigns, status: approvedCampaignsStatus } = useQuery(
    {
      queryKey: ["approved campaigns"],
      queryFn: () => getUserApprovedCampaigns(String(address)),
      enabled: status === "connected",
    }
  );

  const {
    data,
    status: profileStatus,
    error,
    isError,
  } = useContractReads({
    contracts: [
      {
        ...config,
        functionName: "getUserCampaigns",
        args: [address as `0x${string}`],
      },
      {
        ...config,
        functionName: "getDonationsByDonator",
        args: [address as `0x${string}`],
      },
    ],
    enabled: isConnected,
  });

  console.log(data, profileStatus, isError);
  if (
    walletStatus === "loading" ||
    status === "connecting" ||
    status === "reconnecting" ||
    profileStatus === "loading" ||
    waitingCampaignsStatus === "loading" ||
    approvedCampaignsStatus === "loading"
  )
    return (
      <div className="h-[60vh] flex items-center justify-center">
        Loading...
      </div>
    );

  if (
    walletStatus === "error" ||
    profileStatus === "error" ||
    waitingCampaignsStatus === "error" ||
    approvedCampaignsStatus === "error"
  )
    return (
      <div className="h-[60vh] flex items-center justify-center">
        Some error occured! Please try again.
      </div>
    );

  if (status === "disconnected") return "Not authenticated.";
  if (
    status === "connected" &&
    profileStatus === "success" &&
    data !== undefined
  )
    return (
      <div className="max-w-6xl mx-5 p-10 xl:mx-auto">
        <div className="grid grid-cols-2 gap-1">
          <div className="w-full flex justify-center">
            <div>
              {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJapEe9b-WgzEDHpQSp6SCrdVHS32o35c_2g&usqp=CAU"
              alt="pfp"
              className="block rounded-full h-36 w-36"
            /> */}
              <div className="h-36 w-36 rounded-full bg-gradient-to-br from-red-500 to-blue-500"></div>
            </div>
          </div>
          <div className="cols-span-2 pt-5 grid grid-cols-3 text-center">
            <span className="text-3xl">{data[1]?.result?.length}</span>
            <span className="text-3xl">6</span>
            <span className="text-3xl">{data[0]?.result?.length}</span>
            <div>Donations</div>
            <div>Wishlist</div>
            <div>Campaigns</div>
          </div>
          <div className="flex items-center flex-col pt-4">
            <div>
              <p className="font-bold text-lg">Account ID : {address}</p>
              <p className="pt-2">Balance : {walletData?.formatted}</p>
            </div>
          </div>
        </div>
        <hr className="border-[1px] mt-9 " />
        {}
        {profileStatus === "success" &&
          waitingCampaignsStatus === "success" &&
          approvedCampaignsStatus === "success" &&
          data !== undefined &&
          data[1].result !== undefined &&
          waitingCampaigns !== undefined &&
          data[0].result !== undefined && (
            <ProfileTabs
              publishedCampaigns={data[0].result}
              donations={data[1].result}
              waitingCampaigns={waitingCampaigns.campaigns}
              approvedCampaigns={approvedCampaigns.campaigns}
            />
          )}
      </div>
    );
};

type Donation = {
  id: string;
  donator: `0x${string}`;
  amount: bigint;
  message: string;
};

type Campaign = {
  id: string;
  owner: `0x${string}`;
  title: string;
  description: string;
  images: readonly string[];
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  donations: readonly Donation[];
};

const ProfileTabs = ({
  publishedCampaigns,
  donations,
  waitingCampaigns,
  approvedCampaigns,
}: {
  publishedCampaigns: readonly Campaign[];
  donations: readonly Donation[];
  waitingCampaigns: DBCampaign[];
  approvedCampaigns: DBCampaign[];
}) => {
  const tabs = ["My Campaign", "Donations", "Wishlist"];

  const [tab, setTab] = useState<string>(tabs[0]);
  return (
    <div className="w-full">
      <div className="flex justify-center gap-20 text-foreground/50">
        {tabs.map((tabVal, index) => (
          <button
            key={index}
            onClick={() => setTab(tabVal)}
            className={`${
              tabVal === tab &&
              "border-t-2 border-primary  py-10  font-bold text-foreground"
            }`}
          >
            {tabVal}
          </button>
        ))}
      </div>
      <div>
        {/* for donations tab */}
        {tab === tabs[1] && (
          <div>
            <div className="flex flex-col p-4">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    {donations.length === 0 ? (
                      <p className="text-center">No donations yet!</p>
                    ) : (
                      <table className="min-w-full text-sm font-light text-center">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              Index
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Donator Wallet
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Campaign
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {donations.map((donation, index) => (
                            <tr
                              className="border-b dark:border-neutral-500"
                              key={donation.id}
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-ellipsis">
                                {/* {donation.transaction_hash} */}
                                {donation.donator}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <Link
                                  href={`/discover/id`}
                                  // ${donation.campaignId}
                                  className="text-primary underline"
                                >
                                  Campaign ID
                                  {/* {donation.campaignId} */}
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {Number(donation?.amount / WeiPerEther)} ETH
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* for the wishlist detail */}
        {tab === tabs[2] && (
          <div className="grid grid-cols-3">
            {/* <CampaignCard
              id={1}
              title="Help for isarel"
              account="0xA49277A2786131c46a8ee7998cD787C64D6A10A3"
              progress="34%"
              backers={24}
              status={true}
              image="https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw="
        /> */}
          </div>
        )}
        {/* for the my campaign detail */}
        {tab === tabs[0] && (
          <div className="grid grid-cols-3 gap-4">
            <p className="md:col-span-3 font-bold mt-8 mb-4 text-center">
              Published Campaigns
            </p>
            {publishedCampaigns.length === 0
              ? "No campaigns yet"
              : publishedCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} {...campaign} />
                ))}
            <p className="md:col-span-3 font-bold mt-8 mb-4 text-center">
              Approved Campaigns
            </p>
            {approvedCampaigns.length === 0 || undefined
              ? "No campaigns yet"
              : approvedCampaigns.map((campaign) => (
                  <UserCampaignCard key={campaign.id} campaign={campaign} />
                ))}
            <p className="md:col-span-3 font-bold mt-8 mb-4 text-center">
              Waiting Campaigns
            </p>
            {waitingCampaigns.length === 0 || undefined
              ? "No campaigns yet"
              : waitingCampaigns.map((campaign) => (
                  <UserCampaignCard key={campaign.id} campaign={campaign} />
                ))}
            <p className="md:col-span-3 font-bold mt-8 mb-4 text-center">
              Rejected Campaigns
            </p>
            {"rejected campaigns"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
