import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { TbMessageCircleHeart } from "react-icons/tb";
import { BsDot } from "react-icons/bs";
import usePopup from "@/components/Popup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { RxCross2 } from "react-icons/rx";
import { IoMdLink } from "react-icons/io";
import { FaShare, FaRegHeart } from "react-icons/fa";
import { LiaDonateSolid } from "react-icons/lia";
import toast from "react-hot-toast";
import { useContractRead, useContractWrite } from "wagmi";
import { constAbi, contractAddress } from "@/lib/contract";
import { WeiPerEther, parseEther } from "ethers";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

type Donation = {
  id: string;
  donator: `0x${string}`;
  amount: bigint;
  message: string;
};

const CampaignPage = () => {
  dayjs.extend(relativeTime);

  const date = new Date();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [fetch, setFetch] = useState<boolean>(false);
  const [topDonation, setTopDonation] = useState<Donation | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const { Popup, open, setOpen } = usePopup();
  const [donatePopup, setDonatePopup] = useState<boolean>(false);

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setFetch(true);
    }
  }, [router.query, id]);
  // const { data, status } = useQuery({
  //   queryKey: ["get campaign"],
  //   queryFn: () => getCampaign(String(id)),
  //   enabled: fetch,
  // });

  // const mutate = useMutation({
  //   mutationKey: ["donate"],
  //   mutationFn: () =>
  //     donate({
  //       amount,
  //       message,
  //       campaignId: String(data?.id),
  //     }),
  //   onError: (error) => {
  //     toast.dismiss("donation");
  //     console.log(error);
  //     toast.error("Something went wrong!");
  //   },
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries(["get campaign"]);
  //     toast.dismiss("donation");
  //     setDonateOpen(false);

  //     console.log(data);
  //     toast.success("Thankyou, for your donation!");
  //   },
  // });

  const { data, status, refetch } = useContractRead({
    abi: constAbi,
    address: contractAddress,
    functionName: "getCampaign",
    args: [String(id)],
    enabled: fetch,
  });

  const { writeAsync, isSuccess, isError } = useContractWrite({
    abi: constAbi,
    address: contractAddress,
    functionName: "donateToCampaign",
    value: parseEther(String(amount)),
    args: [String(id), message],
    onSuccess: () => {
      refetch();
      setDonatePopup(false);
      toast.remove("donation");
      toast.success("Succesfully recieved your payment.");
    },
    onError: () => {
      refetch();
      setDonatePopup(false);
      toast.remove("donation");
      toast.error("Payment failed! Please try again.");
    },
  });

  useEffect(() => {
    function findDonationWithHighestAmount(
      donationArray: readonly Donation[]
    ): Donation {
      return donationArray.reduce((maxDonation, currentDonation) => {
        return currentDonation.amount > maxDonation.amount
          ? currentDonation
          : maxDonation;
      }, donationArray[0]);
    }
    if (status === "success" && data !== undefined) {
      if (data.donations.length !== 0) {
        setTopDonation(findDonationWithHighestAmount(data.donations));
      }
      console.log(data.target / WeiPerEther);
    }
  }, [data, status]);

  if (status === "loading") return "loading..";
  if (status === "error") return "error..";
  if (status === "success")
    return (
      <div className="py-8" suppressHydrationWarning>
        <Popup>
          <div className="p-2 flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center font-bold">
              <p>Share</p>
              <RxCross2
                onClick={() => setOpen(false)}
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
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Carousel className="max-w-[60%] m-10">
              <CarouselContent>
                {data?.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt="Image"
                      className="rounded-lg w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="border border-muted rounded-md p-4 flex flex-col gap-4 w-full">
              <h4 className="text-lg text-muted-foreground">
                <span className="font-bold text-foreground">
                  {Number(BigInt(String(data?.amountCollected)) / WeiPerEther)}{" "}
                  ETH
                </span>{" "}
                raised of{" "}
                <span className="font-bold text-foreground">
                  {"  "}
                  {Number(BigInt(String(data?.target)) / WeiPerEther)} ETH
                </span>{" "}
                goal.
              </h4>
              <div className="h-2 w-full bg-muted rounded-md">
                <div
                  className="h-2 bg-primary rounded-md"
                  style={{
                    width: `${
                      (Number(
                        BigInt(String(data?.amountCollected)) / WeiPerEther
                      ) /
                        Number(BigInt(String(data?.target)) / WeiPerEther)) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-muted-foreground">
                {data?.donations.length} donations
              </p>
              <Dialog open={donatePopup} onOpenChange={setDonatePopup}>
                <DialogTrigger asChild>
                  <button
                    className="p-4 bg-primary text-background hover:text-muted-foreground rounded-md hover:bg-background border border-muted transition-all flex gap-2 items-center justify-center w-full"
                    // onClick={() => setDonateOpen((prevVal) => !prevVal)}
                  >
                    <LiaDonateSolid size={20} /> Donate Now
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Donate</DialogHeader>
                  <div className="p-2 flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-4">
                      <label htmlFor="amount">Amount</label>
                      <input
                        key="amount-input"
                        className=" p-4 border border-muted rounded-md bg-transparent"
                        type="number"
                        name="amount"
                        placeholder="Amount (ETH)"
                        onChange={(event) =>
                          setAmount(Number(event.target.value))
                        }
                        value={amount}
                      />
                      <label htmlFor="message">Message</label>
                      <textarea
                        key="message-input"
                        className="p-4 border border-muted rounded-md bg-transparent"
                        name="message"
                        placeholder="Message"
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                      />
                    </div>
                    <div className="text-end ">
                      <DialogClose asChild>
                        <button
                          className="bg-red-500 rounded-md p-2 m-2 hover:bg-red-200 hover:text-muted"
                          // onClick={() => setDonateOpen(false)}
                        >
                          Cancel
                        </button>
                      </DialogClose>
                      <button
                        className=" rounded-md p-2 border border-muted m-2 hover:bg-secondary"
                        onClick={async () => {
                          toast.loading("Processing your payment...", {
                            id: "donation",
                          });
                          await writeAsync();
                          // mutate.mutateAsync();
                        }}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <button
                className="p-4 hover:bg-secondary rounded-md bg-background hover:text-muted-foreground  border border-muted transition-all flex gap-2 items-center justify-center"
                onClick={() => setOpen((prevVal) => !prevVal)}
              >
                <FaShare size={20} /> Share
              </button>
              {/* <button
            className="p-4 hover:bg-secondary rounded-md bg-background hover:text-muted-foreground  border border-muted transition-all flex gap-2 items-center justify-center"
            onClick={() => setOpen((prevVal) => !prevVal)}
          >
            <FaRegHeart size={20} /> Wishlist
          </button> */}
              <div className="flex w-full p-4 gap-4">
                {topDonation === null ? (
                  "No donations yet."
                ) : (
                  <>
                    <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
                      <TbMessageCircleHeart size={40} />
                      <div className="flex flex-col gap-2 ">
                        <span className="font-bold ">Top Donation</span>
                        <div className="flex items-center gap-2 text-muted-foreground font-bold">
                          <span>
                            {Number(
                              BigInt(String(topDonation.amount)) / WeiPerEther
                            )}
                          </span>
                          <BsDot />
                          <span>
                            {topDonation.donator.slice(0, 5)}.....
                            {topDonation.donator.slice(-6, -1)}
                          </span>
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
                  </>
                )}
              </div>
              <span className="text-muted-foreground px-4 font-bold text-sm">
                Created on -----.
              </span>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-4 p-4 text-muted-foreground">
            <div className="py-8">
              <span className="font-bold">Message from the raiser:</span>
              <p className="whitespace-pre-line">{data?.description}</p>
            </div>
            <div className="py-8">
              <p className="text-muted-foreground font-bold">
                Words of Support:
              </p>
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
                        <span>
                          {Number(
                            BigInt(String(donation.amount)) / WeiPerEther
                          )}{" "}
                          ETH
                        </span>
                        <BsDot />
                        <span>time</span>
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
  return "Loading";
};

export default CampaignPage;
