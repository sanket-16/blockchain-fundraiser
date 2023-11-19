import CampaignCard from "@/components/CampaignCard";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useBalance } from "wagmi";

const Profile = () => {
  const { data, status } = useSession();
  const { data: walletData, status: walletStatus } = useBalance({
    address: data?.user.wallet_id as `0x${string}`,
  });
  console.log(walletData);
  if (status === "loading" || walletStatus === "loading") return "loading...";
  if (status === "unauthenticated") return "Not authenticated.";
  return (
    <div className="max-w-6xl mx-5 p-10 xl:mx-auto">
      <div className="grid grid-cols-2 gap-1">
        <div className="w-full flex justify-center">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJapEe9b-WgzEDHpQSp6SCrdVHS32o35c_2g&usqp=CAU"
              alt="pfp"
              className="block rounded-full h-36 w-36"
            />
          </div>
        </div>
        <div className="cols-span-2 pt-5 grid grid-cols-3 text-center">
          <span className="text-3xl">7</span>
          <span className="text-3xl">6</span>
          <span className="text-3xl">7</span>
          <div>Contributions</div>
          <div>Wishlist</div>
          <div>Campaigns</div>
        </div>
        <div className="flex items-center flex-col pt-4">
          <div>
            <p className="font-bold text-lg">
              Account ID : {data?.user.wallet_id}
            </p>
            <p className="pt-2">Balance : {walletData?.formatted}</p>
          </div>
        </div>
      </div>
      <hr className="border-[1px] mt-9 " />
      <ProfileTabs />
    </div>
  );
};

const ProfileTabs = () => {
  const tabs = ["Transactions", "Wishlist", "My Campaign"];

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
        {/* for transaction tab */}
        {tab === tabs[0] && (
          <div>
            <div className="flex flex-col p-4">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-sm font-light text-center">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Invoice
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Method
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            1
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Mark</td>
                          <td className="whitespace-nowrap px-6 py-4">Otto</td>
                          <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            2
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            Thornton
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">@fat</td>
                        </tr>
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            3
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">Larry</td>
                          <td className="whitespace-nowrap px-6 py-4">Wild</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            @twitter
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* for the wishlist detail */}
        {tab === tabs[1] && (
          <div className="grid grid-cols-3">
            <CampaignCard
              id={1}
              title="Help for isarel"
              account="0xA49277A2786131c46a8ee7998cD787C64D6A10A3"
              progress="34%"
              backers={24}
              status={true}
              image="https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw="
            />
          </div>
        )}
        {/* for the my campaign detail */}
        {tab === tabs[2] && (
          <div className="grid grid-cols-3">
            <CampaignCard
              id={1}
              title="Help for isarel"
              account="0xA49277A2786131c46a8ee7998cD787C64D6A10A3"
              progress="34%"
              backers={24}
              status={true}
              image="https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw="
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
