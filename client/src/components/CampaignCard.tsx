import Link from "next/link";
import React from "react";

const CampaignCard = ({
  id,
  title,
  account,
  progress,
  backers,
  status,
  image,
}: {
  id: number;
  title: string;
  account: string;
  progress: string;
  backers: number;
  status: boolean;
  image: string;
}) => {
  return (
    <Link
      href={`/discover/${id}`}
      className="rounded-md  p-4 border-2 border-muted hover:cursor-pointer hover:bg-secondary"
    >
      <img src={image} alt="project title" className="rounded-md" />
      <div className="p-4 flex  flex-col">
        <h5>{title}</h5>

        <div className="flex  justify-between items-center mb-3">
          <small className="text-gray-700">{account}</small>
        </div>
        <small>2 day left</small>
      </div>
      <div className="w-full bg-muted">
        <div
          className="bg-primary text-xs font-medium  text-center  rounded-md h-1"
          style={{ width: progress }}
        ></div>
      </div>
      <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500">
        <small className=" font-bold">{backers} donations</small>
        <div>
          {status ? (
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
