import CampaignCard from "@/components/CampaignCard";
import React, { useState } from "react";

const profile = () => {
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
              Account ID : 0xA49277A27...87C64D6A10A3
            </p>
            <p className="pt-2">Balance : 9,000</p>
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
<<<<<<< HEAD
            className={`${tabVal === tab && "border-t-2 py-10  font-bold text-foreground"
              }`}
=======
            className={`${
              tabVal === tab &&
              "border-t-2 border-primary  py-10  font-bold text-foreground"
            }`}
>>>>>>> 26d7beadc7a29966d9ac7a4e32b8fbf64f73ba1d
          >
            {tabVal}
          </button>
        ))}
      </div>
      <div>
        {/* for transaction tab */}
        {tab === tabs[0] && <div>
          <div className="flex flex-col p-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-sm font-light text-center">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">Invoice</th>
                        <th scope="col" className="px-6 py-4">Status</th>
                        <th scope="col" className="px-6 py-4">Method</th>
                        <th scope="col" className="px-6 py-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                        <td className="whitespace-nowrap px-6 py-4">Mark</td>
                        <td className="whitespace-nowrap px-6 py-4">Otto</td>
                        <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                        <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                      </tr>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                        <td className="whitespace-nowrap px-6 py-4">Larry</td>
                        <td className="whitespace-nowrap px-6 py-4">Wild</td>
                        <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>}
        {/* for the wishlist detail */}
        {tab === tabs[1] && <div>
          <CampaignCard/>
            </div>}
          {/* for the my campaign detail */}
        {tab === tabs[2] && <div>
          <CampaignCard/>
          </div>}
      </div>
    </div>
  );
};

export default profile;
