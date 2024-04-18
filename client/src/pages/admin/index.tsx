import AdminCampaignCard from "@/components/AdminCampaignCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import adminAuth from "@/lib/api/admin-auth";
import getAllCampaigns from "@/lib/api/campaigns/getAll";
import getWaitingCampaigns from "@/lib/api/campaigns/waiting";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMutation } from "wagmi";

const AdminDashboard = () => {
  const [password, setPasword] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, mutateAsync } = useMutation({
    mutationKey: ["admin-auth"],
    mutationFn: () => adminAuth(password),
    onSuccess: () => {
      console.log("success");
      setEnabled(true);
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <div className="p-8 w-full">
      <h2 className="md:text-xl text-lg font-bold">Admin Dashboard</h2>
      {enabled ? (
        <AdminTabs enabled={enabled} />
      ) : (
        <form
          className="flex flex-col justify-center gap-4 h-full py-16"
          onSubmit={(event) => {
            event.preventDefault();
            mutateAsync();
            console.log(data);
          }}
        >
          <label htmlFor="">Password</label>
          <input
            className=" p-4 border border-muted rounded-md bg-transparent"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(event) => setPasword(event.target.value)}
            value={password}
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;

export function AdminTabs({ enabled }: { enabled: boolean }) {
  const { data, status } = useQuery({
    queryKey: ["get campaigns"],
    queryFn: () => getAllCampaigns(),
    enabled,
  });
  const { data: waitingCampaigns, status: waitingCampaignsStatus } = useQuery({
    queryKey: ["get waiting campaigns"],
    queryFn: () => getWaitingCampaigns(),
    enabled,
  });
  //   const mutate = useMutation({
  //     mutationKey: ["create fundraiser"],
  //     mutationFn: () =>
  //       createCampaign({
  //         title,
  //         amount,
  //         date,
  //         description,
  //         images: images,
  //         location,
  //         category,
  //       }),
  //     onError: (err) => {
  //       toast.remove("campaign_creation");
  //       toast.error("Campaign Creation failed!");
  //       console.log(err);
  //     },
  //     onSuccess: (data) => {
  //       toast.remove("campaign_creation");
  //       toast.success("Campaign created successfully!");
  //       console.log(data);
  //     },
  //   });
  console.log(data);

  return (
    <>
      <Tabs
        defaultValue="all"
        className="w-full grid md:grid-cols-4  gap-4 py-4"
        orientation="vertical"
      >
        <TabsList className="w-full h-full flex flex-col bg-background justify-start">
          <TabsTrigger
            value="approved"
            className="w-full  hover:bg-muted selected:bg-muted"
          >
            Approval Section
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="w-full hover:bg-muted selected:bg-muted"
          >
            All Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="rejected"
            className="w-full  hover:bg-muted selected:bg-muted"
          >
            Rejected Campaigns
          </TabsTrigger>
          <Separator className="my-4" />
          <Button variant="destructive" className="w-full">
            Log Out
          </Button>
        </TabsList>
        <TabsContent value="approved" className="md:col-span-3 h-full">
          <Card>
            <CardHeader>
              <CardTitle>Approval Section</CardTitle>
              <CardDescription>
                Approve the campaigns you wish to approve.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 grid md:grid-cols-2 gap-2 h-[60vh] overflow-scroll">
              {waitingCampaigns?.campaigns
                .filter((campaign) => campaign.status === "Waiting")
                .map((campaign) => (
                  <AdminCampaignCard campaign={campaign} key={campaign.id} />
                ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="md:col-span-3 h-full">
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>Check out all campaigns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 grid md:grid-cols-2 gap-2 h-[60vh] overflow-scroll">
              <div className="flex  items-center justify-around p-2  md:col-span-2 border rounded-md">
                <p className="flex items-center gap-4">
                  <span className="bg-yellow-400 w-4 h-4 rounded-full ring-2 dark:ring-white ring-slate-500"></span>
                  Waiting
                </p>
                <p className="flex items-center gap-4">
                  <span className="bg-green-400 w-4 h-4 rounded-full ring-2 dark:ring-white ring-slate-500"></span>
                  Approved
                </p>
                <p className="flex items-center gap-4">
                  <span className="bg-red-400 w-4 h-4 rounded-full ring-2 dark:ring-white ring-slate-500"></span>
                  Rejected
                </p>
              </div>
              {status === "loading"
                ? "Loading..."
                : data?.campaigns.map((campaign) => (
                    <AdminCampaignCard campaign={campaign} key={campaign.id} />
                  ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="md:col-span-3 h-full">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Campaigns</CardTitle>
              <CardDescription>
                Browse through rejected campaigns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 grid md:grid-cols-2 gap-2 h-[60vh] overflow-scroll">
              {data?.campaigns
                .filter((campaign) => campaign.status === "Rejected")
                .map((campaign) => (
                  <AdminCampaignCard campaign={campaign} key={campaign.id} />
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
