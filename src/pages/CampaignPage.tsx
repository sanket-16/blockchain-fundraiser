import React from "react";
import Image from "next/image";

const CampaignPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Your Campaigns</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Campaign 1 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-end ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-7 text-yellow-400 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <h3 className="text-lg text-yellow-400 font-semibold ">
              Total Balance $50,000
            </h3>
          </div>

          <h2 className="text-3xl text-gray-600 font-bold">
            Fund Raising Startup for Ev
          </h2>
          <p className="text-gray-600">Raised Amount: $5,000</p>
          <div className="flex  justify-between">
            <p className="text-gray-600">
              You can Check Campaign details here !
            </p>
            <button className=" text-white bg-blue-900 p-2 rounded-lg">
              Withdraw Amount
            </button>
          </div>

          <div className="mb-4">
            <img
              src="/campaign.jpg"
              alt="Description of the image"
              className=" p-4 w-full max-h-fit shadow-md "
            />
            <h2 className=" text-lg text-blue-800 font-bold  ">
              Raising Capital for InHouse Ev StartUp
            </h2>

            <div className=" flex justify-between">
              <p className="text-base  font-semibold mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&#39;s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled{" "}
              </p>
              <div className="flex flex-col mr-8">
                <h2>Investors : 5000</h2>
                <h3>Remaining Days</h3>
              </div>
            </div>
            <div className="flex justify-between">
              <button className=" text-white bg-green-400 p-2 px-8 rounded-lg">
                Raise <p></p>
              </button>
              <h2 className="mt-5 text-lg text-blue-800 font-semibold">
                Raised Of $5000
              </h2>
            </div>
          </div>
        </div>

        {/* Add more campaign cards as needed */}

        {/* Investors  */}
        <div className="bg-slate-200 text-black mt-8 p-4 rounded-lg shadow-md">
          <p className="text-xl  font-semibold mb-4">
            Your Campaign is backed by following investors
          </p>

          {/* Investors */}
          <div></div>
          <div className="bg-white flex items-center justify-between bg-blue rounded-lg shadow-md p-2 mb-4">
            {/* Investor Image (left) */}
            <div className="flex-shrink-0">
              <img
                src="/follower1.jpg"
                alt="Investor"
                className="w-12 h-12 rounded-full"
              />
            </div>
            {/* Invested Amount (middle) */}
            <div className="text-center">
              <p className="text-lg font-semibold">$5,000</p>
              invested amount
            </div>
            {/* Message Icon (right) */}
            <div>
              <button className="text-blue-500 hover:text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className=" bg-white flex items-center justify-between bg-blue rounded-lg shadow-md p-2 mb-4">
            {/* Investor Image (left) */}
            <div className="flex-shrink-0">
              <img
                src="/follower1.jpg"
                alt="Investor"
                className="w-12 h-12 rounded-full"
              />
            </div>
            {/* Invested Amount (middle) */}
            <div className="text-center">
              <p className="text-lg font-semibold">$5,000</p>
              invested amount
            </div>
            {/* Message Icon (right) */}
            <div>
              <button className="text-blue-500 hover:text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className=" bg-white flex items-center justify-between bg-blue rounded-lg shadow-md p-2 mb-4">
            {/* Investor Image (left) */}
            <div className="flex-shrink-0">
              <img
                src="/follower1.jpg"
                alt="Investor"
                className="w-12 h-12 rounded-full"
              />
            </div>
            {/* Invested Amount (middle) */}
            <div className="text-center">
              <p className="text-lg font-semibold">$5,000</p>
              invested amount
            </div>
            {/* Message Icon (right) */}
            <div>
              <button className="text-blue-500 hover:text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className=" bg-white flex items-center justify-between bg-blue rounded-lg shadow-md p-2 mb-4">
            {/* Investor Image (left) */}
            <div className="flex-shrink-0">
              <img
                src="/follower1.jpg"
                alt="Investor"
                className="w-12 h-12 rounded-full"
              />
            </div>
            {/* Invested Amount (middle) */}
            <div className="text-center">
              <p className="text-lg font-semibold">$5,000</p>
              invested amount
            </div>
            {/* Message Icon (right) */}
            <div>
              <button className="text-blue-500 hover:text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Follower container */}

        {/* Your Follower */}
        <div className="bg-slate-200 text-black mt-8 p-4 rounded-lg shadow-md">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Followers</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4">
                <div className="w-56 bg-gray-200 rounded-lg p-4 flex-shrink-0">
                  <div className="text-gray-800 font-semibold">Follower 1</div>
                  <div className="text-gray-500">
                    Supporter of the fundraising campaign
                  </div>
                </div>

                <div className="w-56 bg-gray-200 rounded-lg p-4 flex-shrink-0">
                  <div className="text-gray-800 font-semibold">Follower 2</div>
                  <div className="text-gray-500">
                    Supporter of the fundraising campaign
                  </div>
                </div>

                <div className="w-56 bg-gray-200 rounded-lg p-4 flex-shrink-0">
                  <div className="text-gray-800 font-semibold">Follower 3</div>
                  <div className="text-gray-500">
                    Supporter of the fundraising campaign
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignPage;
