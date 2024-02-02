import Link from "next/link";
import React from "react";
import type { Campaign } from "@/lib/api/campaigns/getAll";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Donation = {
  id: string;
  donator: `0x${string}`;
  amount: bigint;
  message: string;
};

function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const CampaignCard = ({
  id,
  title,
  owner,
  description,
  images,
  target,
  deadline,
  amountCollected,
  donations,
}: {
  id: string;
  owner: `0x${string}`;
  title: string;
  description: string;
  images: readonly string[];
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  donations: readonly Donation[];
}) => {
  const date = new Date();
  dayjs.extend(relativeTime);
  return (
    <Link
      href={`/discover/${id}`}
      className="rounded-md  p-4 border-2 border-muted hover:cursor-pointer hover:bg-secondary"
    >
      <img src={images[0]} alt="project title" className="rounded-md" />
      <div className="p-4 flex  flex-col">
        <h5>{title}</h5>

        <div className="flex  justify-between items-center mb-3">
          <small className="text-gray-700">{owner}</small>
        </div>
        <small>Ends on {timestampToDate(Number(deadline))}</small>
      </div>
      <div className="w-full bg-muted">
        <div
          className="bg-primary text-xs font-medium  text-center  rounded-md h-1"
          style={{
            width: `${(Number(amountCollected) / Number(target)) * 100}%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500">
        <small className=" font-bold">{donations.length} donations</small>
        <div>
          {/* {date >= end_date ? ( */}
          <small className="text-green-500">Open</small>
          {/* ) : (
             <small className="text-red-500">Closed</small>
           )} */}
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
