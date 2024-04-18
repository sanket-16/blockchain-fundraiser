import Link from "next/link";
import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Campaign } from "@prisma/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAccount, useContractWrite } from "wagmi";
import { constAbi, contractAddress } from "@/lib/contract";
import { parseEther } from "ethers";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "react-query";
import updateStatus from "@/lib/api/campaigns/status";

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
      <img src={images[0]} alt="project title" className="rounded-md w-full " />
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

export const UserCampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const queryClient = useQueryClient();
  const { address, isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const statusMutatation = useMutation({
    mutationKey: ["update status"],
    mutationFn: () => updateStatus({ id: campaign.id, status: "Published" }),
  });
  const { writeAsync, isSuccess, isError } = useContractWrite({
    abi: constAbi,
    address: contractAddress,
    functionName: "createCampaign",
    onSuccess: (data) => {
      console.log(data);
      statusMutatation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["waiting campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["approved campaigns"] });
      toast.dismiss("loading");
      toast.success("Campaign Created Successfully.");
    },
    onError: (error) => {
      console.log(error);
      toast.dismiss("loading");
      toast.error("Campaign Creation failed.");
    },
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="p-4 hover:bg-muted/50 hover:cursor-pointer">
            <CardTitle>
              <img
                src={campaign.images[0]}
                alt="campaign image"
                className="mb-4 rounded-md"
              />
            </CardTitle>
            <CardContent className="flex flex-col gap-4 text-wrap break-all">
              <p className="font-bold flex items-center gap-4 text-wrap break-all">
                {campaign.title}
              </p>
              <p className="text-xs font-bold dark:text-muted text-black/50">
                {campaign.owner}
              </p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-[90vh]"}
        >
          <DialogHeader>
            <DialogTitle className="text-wrap  whitespace-pre-wrap break-all">
              {campaign.title}
            </DialogTitle>
            <DialogDescription>
              Uploaded at - {new Date(campaign.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <p className="font-bold text-xl"> Target - {campaign.target} ETH</p>
          <p className="text-white/50 font-bold">Images (Public Images) :</p>
          {campaign.images.length === 0 ? (
            "No images uploaded"
          ) : (
            <Carousel className="mx-10 ">
              <CarouselContent>
                {campaign.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="text-center w-full flex items-center justify-center">
                      <img
                        src={image}
                        alt="Image"
                        className="rounded-lg w-auto text-center max-h-96 min-w-96"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <p className="text-white/50 font-bold">Proof (Private Images) :</p>
          {campaign.proof.length === 0 ? (
            "No proof uploaded"
          ) : (
            <Carousel className="mx-10 ">
              <CarouselContent>
                {campaign.proof.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="text-center w-full flex items-center justify-center">
                      <img
                        src={image}
                        alt="Image"
                        className="rounded-lg w-auto text-center max-h-96 "
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <p className="text-white/50 font-bold">End Date :</p>
          <p> {new Date(campaign.end_date).toLocaleString()}</p>
          <p className="text-white/50 font-bold">Description :</p>
          <div className="text-wrap whitespace-pre-wrap break-all">
            {campaign.description}
          </div>
          <DialogFooter>
            {campaign.status === "Approved" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Publish</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Once your campaign is published it cannot be edited.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        setOpen(false);
                        toast.loading("Publishing your campaign...", {
                          id: "loading",
                        });
                        // writeAsync();
                        if (isConnected) {
                          const args: readonly [
                            string,
                            `0x${string}`,
                            string,
                            string,
                            string,
                            readonly string[],
                            bigint,
                            bigint,
                            bigint
                          ] = [
                            uuidv4(),
                            campaign.owner as `0x${string}`,
                            campaign.title,
                            campaign.description,
                            campaign.category,
                            campaign.images,
                            parseEther(String(campaign.target)),
                            BigInt(new Date(campaign.end_date).getTime()),
                            BigInt(new Date().getTime()),
                          ];
                          await writeAsync({ args: args });
                        }
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignCard;
