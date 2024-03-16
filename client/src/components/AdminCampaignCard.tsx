import { Campaign } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import updateStatus from "@/lib/api/campaigns/status";
import { Button } from "./ui/button";

const AdminCampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const mutate = useMutation({
    mutationKey: ["update status of fundraiser"],
    mutationFn: updateStatus,
    onError: (err) => {
      toast.remove("campaign_status_update");
      toast.error("Campaign status update failed!");
      console.log(err);
    },
    onSuccess: (data) => {
      toast.remove("campaign_status_update");
      toast.success("Campaign status update successfull!");
      console.log(data);
    },
  });
  return (
    <>
      <Dialog>
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
                <span
                  className={`${
                    campaign.status === "Waiting" && "bg-yellow-400"
                  }
          ${campaign.status === "Rejected" && "bg-red-400"}
          ${campaign.status === "Approved" && "bg-green-400"} 
          max-w-[8px] max-h-[8px] min-w-[8px] min-h-[8px]  rounded-full ring-2 dark:ring-white ring-slate-500  `}
                ></span>
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
                    <img
                      src={image}
                      alt="Image"
                      className="rounded-lg w-full "
                    />
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
                    <img
                      src={image}
                      alt="Image"
                      className="rounded-lg w-full "
                    />
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
          {campaign.status === "Waiting" && (
            <DialogFooter>
              <Button
                size="lg"
                onClick={() => {
                  toast.loading("campaign_status_update");
                  mutate.mutateAsync({ id: campaign.id, status: "Approved" });
                }}
                disabled={mutate.status === "loading"}
              >
                Accept
              </Button>
              <Button
                size="lg"
                className="bg-red-500 text-white"
                onClick={() => {
                  toast.loading("campaign_status_update");
                  mutate.mutateAsync({ id: campaign.id, status: "Rejected" });
                }}
                disabled={mutate.status === "loading"}
              >
                Reject
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminCampaignCard;
