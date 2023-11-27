import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TbMessageCircleHeart } from "react-icons/tb";
import { BsDot } from "react-icons/bs";
import usePopup from "@/components/Popup";
import { useQuery } from "react-query";
import getCampaign from "@/lib/api/campaigns/get";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RxCross2 } from "react-icons/rx";
import { IoMdLink } from "react-icons/io";
import { FaShare, FaRegHeart } from "react-icons/fa";
import { LiaDonateSolid } from "react-icons/lia";

const CampaignPage = () => {
  dayjs.extend(relativeTime);
  const date = new Date();
  const router = useRouter();
  const [fetch, setFetch] = useState<boolean>(false);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      setFetch(true);
    }
  }, [router.query, id]);
  const { data, status } = useQuery({
    queryKey: ["get campaign"],
    queryFn: () => getCampaign(String(id)),
    enabled: fetch,
  });
  const { Popup, open, setOpen } = usePopup();
  if (status === "loading") return "loading..";
  if (status === "error") return "error..";
  return (
    <div className="py-8">
      <Popup>
        <div className="p-2 flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center font-bold">
            <p>Share</p>
            <RxCross2
              className="hover:cursor-pointer hover:text-red-500"
              size={20}
            />
          </div>
          <div className="border border-muted rounded-md p-4">{}</div>
          <div className="text-muted-foreground">
            <div className="border border-muted rounded-md p-4 flex items-center gap-4 min-w-[20rem] hover:cursor-pointer hover:bg-secondary ">
              <IoMdLink size={20} />
              Copy link
            </div>
          </div>
          {/* <div className="text-end ">
            <button className="bg-red-500 rounded-md p-2 m-2">Cancel</button>
            <button className="bg-primary-500 rounded-md p-2 border border-muted m-2">
              Create Campaign
            </button>
          </div> */}
        </div>
      </Popup>
      <h3 className="text-3xl font-bold py-8">{data?.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={data?.images[0]} alt="Image" className="rounded-md w-full" />
        <div className="border border-muted rounded-md p-4 flex flex-col gap-4">
          <h4 className="text-lg text-muted-foreground">
            <span className="font-bold text-foreground">
              {data?.completed_amount} ETH
            </span>{" "}
            raised of{" "}
            <span className="font-bold text-foreground">
              {" "}
              {data?.total_amount} ETH
            </span>{" "}
            goal.
          </h4>
          <div className="h-2 w-full bg-muted rounded-md">
            <div
              className="h-2 bg-primary rounded-md"
              style={{
                width: `${
                  Number(data?.completed_amount) / Number(data?.total_amount)
                }%`,
              }}
            ></div>
          </div>
          <p className="text-muted-foreground">
            {data?._count.donations} donations
          </p>
          <button className="p-4 bg-primary text-background hover:text-muted-foreground rounded-md hover:bg-background border border-muted transition-all flex gap-2 items-center justify-center">
            <LiaDonateSolid size={20} /> Donate Now
          </button>
          <button
            className="p-4 hover:bg-secondary rounded-md bg-background hover:text-muted-foreground  border border-muted transition-all flex gap-2 items-center justify-center"
            onClick={() => setOpen((prevVal) => !prevVal)}
          >
            <FaShare size={20} /> Share
          </button>
          <button
            className="p-4 hover:bg-secondary rounded-md bg-background hover:text-muted-foreground  border border-muted transition-all flex gap-2 items-center justify-center"
            onClick={() => setOpen((prevVal) => !prevVal)}
          >
            <FaRegHeart size={20} /> Wishlist
          </button>
          <div className="flex w-full p-4 gap-4">
            <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
              <TbMessageCircleHeart size={40} />
              <div className="flex flex-col gap-2 ">
                <span className="font-bold ">Top Donation</span>
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <span>10 ETH</span>
                  <BsDot />
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
            <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
              <TbMessageCircleHeart size={40} />
              <div className="flex flex-col gap-2 ">
                <span className="font-bold ">Recent Donation</span>
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <span>10 ETH</span>
                  <BsDot />
                  <span>Anonymous</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-muted-foreground px-4 font-bold text-sm">
            Created {dayjs(date).to(dayjs(data?.created_at))}.
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-4 p-4 text-muted-foreground">
          <div className="py-8">
            <span className="font-bold">Message from the raiser:</span>
            <p className="whitespace-pre-line">{data?.description}</p>
          </div>
          <div className="py-8">
            <p className="text-muted-foreground font-bold">Words of Support:</p>
            <div className="flex flex-col gap-4 py-4">
              {data?.donations.map((donation) => (
                <div
                  key={donation.id}
                  className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer"
                >
                  <TbMessageCircleHeart size={40} />
                  <div className="flex flex-col gap-2 ">
                    <span className="font-bold ">Anonymous</span>
                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                      <span>10 ETH</span>
                      <BsDot />
                      <span>{dayjs(date).to(dayjs(donation?.time))}</span>
                    </div>
                    <p>{donation.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
