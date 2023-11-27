import Link from "next/link";
import React from "react";
import type { Campaign } from "@/lib/api/campaigns/getAll";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const CampaignCard = ({
  id,
  title,
  Location,
  _count,
  category,
  images,
  completed_amount,
  end_date,
  total_amount,
  User,
}: Campaign) => {
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
          <small className="text-gray-700">{User.wallet_id}</small>
        </div>
        <small>Ends {dayjs(date).to(dayjs(end_date))}</small>
      </div>
      <div className="w-full bg-muted">
        <div
          className="bg-primary text-xs font-medium  text-center  rounded-md h-1"
          style={{ width: `${completed_amount / total_amount}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500">
        <small className=" font-bold">{_count.donations} donations</small>
        <div>
          {date <= end_date ? (
            <small className="text-green-500">Open</small>
          ) : (
            <small className="text-red-500">Closed</small>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
