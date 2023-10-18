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
        {tab === tabs[0] && <div>My transactions</div>}
        {tab === tabs[1] && <div>Wishlist</div>}
        {tab === tabs[2] && <div>My campaign</div>}
      </div>
    </div>
  );
};

export default profile;
