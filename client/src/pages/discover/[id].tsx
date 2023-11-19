import React from "react";
import { useRouter } from "next/router";
import { TbMessageCircleHeart } from "react-icons/tb";
import { BsDot } from "react-icons/bs";

const CampaignPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold py-8">Help for Isarel</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src="https://media.istockphoto.com/id/1369394082/photo/israel.webp?b=1&s=170667a&w=0&k=20&c=3OVSZ9gVAh-r8hGAqSPoNAzPWvT4thYHvDA_kf2JvHw="
          alt="Image"
          className="rounded-md w-full"
        />
        <div className="border border-muted rounded-md p-4 flex flex-col gap-4">
          <h4 className="text-lg text-muted-foreground">
            <span className="font-bold text-foreground">$627,103 USD</span>{" "}
            raised of{" "}
            <span className="font-bold text-foreground"> $1,000,000</span> goal.
          </h4>
          <div className="h-2 w-full bg-muted rounded-md">
            <div
              className="h-2 bg-primary rounded-md"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-muted-foreground">1.8k donations</p>
          <button className="p-4 bg-secondary rounded-md hover:bg-background border border-muted transition-all">
            Donate Now
          </button>
          <button className="p-4 hover:bg-secondary rounded-md bg-background border border-muted transition-all">
            Share
          </button>
          <div className="flex w-full p-4 gap-4">
            <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
              <TbMessageCircleHeart size={40} />
              <div className="flex flex-col gap-2 ">
                <span className="font-bold ">Top Donation</span>
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <span>$500</span>
                  <BsDot />
                  <span>Sanket Patil</span>
                </div>
              </div>
            </div>
            <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
              <TbMessageCircleHeart size={40} />
              <div className="flex flex-col gap-2 ">
                <span className="font-bold ">Recent Donation</span>
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <span>$50</span>
                  <BsDot />
                  <span>Nidhi Patil</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-muted-foreground px-4 font-bold text-sm">
            Created 3 days ago.
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-4 p-4 text-muted-foreground">
          <div className="py-8">
            <span className="font-bold">Message from the raiser:</span>
            <p>
              {" "}
              This fundraising campaign has been set up to support the thousands
              of displaced Israeli families that were victims of the Hamas-led
              atrocities that occurred on October 7th, 2023. You are here
              because you understand the magnitude of the damage that was done
              and that will carry on for many years to come by the surviving
              families. The pain of lost life runs deep, but this outbreak of
              senseless violence extends far beyond that, with the displacement
              of thousands of families. They&#39;ve been left with their homes
              destroyed, their families dead or missing, their possessions gone
              and their livelihoods decimated - a crisis the likes of which
              Israel has never seen. We are not here to make a statement or
              debate politics; we are not journalists or politicians. We are a
              group of passionate professionals from across industries on a
              mission to launch the first major grassroots movement to stand
              with Israel alongside each of you. We are working directly with
              the Jewish Federations of North America, which has set out to
              raise $500 million for Israel during the worst humanitarian crisis
              for Jews since the Holocaust. This campaign is dedicated to
              raising the portion of funds explicitly for displaced families in
              need. We aim to centralize contributions from across networks and
              organizations, guaranteeing that each and every dollar reaches
              local communities as quickly as possible in order to get urgently
              needed humanitarian relief directly to the many families whose
              homes and towns have been destroyed. Every dollar donated counts,
              every repost counts, every ‘like’ counts. Let’s show the world
              what we are made of!
            </p>
          </div>
          <div className="py-8">
            <p className="text-muted-foreground font-bold">Words of Support:</p>
            <div className="flex flex-col gap-4 py-4">
              <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
                <TbMessageCircleHeart size={40} />
                <div className="flex flex-col gap-2 ">
                  <span className="font-bold ">Sanket Patil</span>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                    <span>$50</span>
                    <BsDot />
                    <span>6hrs ago</span>
                  </div>
                  <p>
                    To help Israel, for food, water, shelter. Whatever the need.
                    I Pray Almighty God, Jehovah Jireh&#39;s Protection of
                    Israel. Surround her borders. To annihilate the hamas
                    organization. Peace within & without! I Pray for the
                    Salvation of all In Jesus Name! Amen
                  </p>
                </div>
              </div>
              <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
                <TbMessageCircleHeart size={40} />
                <div className="flex flex-col gap-2 ">
                  <span className="font-bold ">Sanket Patil</span>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                    <span>$50</span>
                    <BsDot />
                    <span>6hrs ago</span>
                  </div>
                  <p>
                    To help Israel, for food, water, shelter. Whatever the need.
                    I Pray Almighty God, Jehovah Jireh&#39;s Protection of
                    Israel. Surround her borders. To annihilate the hamas
                    organization. Peace within & without! I Pray for the
                    Salvation of all In Jesus Name! Amen
                  </p>
                </div>
              </div>
              <div className="w-full flex border border-muted p-4 rounded-md gap-4 items-center hover:bg-secondary hover:cursor-pointer">
                <TbMessageCircleHeart size={40} />
                <div className="flex flex-col gap-2 ">
                  <span className="font-bold ">Sanket Patil</span>
                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                    <span>$50</span>
                    <BsDot />
                    <span>6hrs ago</span>
                  </div>
                  <p>
                    To help Israel, for food, water, shelter. Whatever the need.
                    I Pray Almighty God, Jehovah Jireh&#39;s Protection of
                    Israel. Surround her borders. To annihilate the hamas
                    organization. Peace within & without! I Pray for the
                    Salvation of all In Jesus Name! Amen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
