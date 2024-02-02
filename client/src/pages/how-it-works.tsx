import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <div className="py-10 flex flex-col gap-4 w-full h-full justify-center items-center">
      <Accordion type="multiple" className="md:w-[640px] ">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Don&#39;t know how to use blockchain or setup a Metamask wallet?
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p>
                We would recommend visiting{" "}
                <Link
                  className="text-primary underline"
                  href={
                    "https://support.metamask.io/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                  }
                >
                  Metamask&#39;s website
                </Link>{" "}
                for detailed explanation on how to create a Metamask Wallet.
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YVgfHZMFFFQ?si=y_OSSeLghikuJycr"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Don&#39;t know how to add money to your Metamask Wallet?
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p>
                There are a lot of ways for transferring money to a crypto
                wallet. We would recommend using metamask for beginners.{" "}
                <Link
                  className="text-primary underline"
                  href={
                    "https://metamask.io/news/latest/how-to-use-metamasks-buy-feature-to-fund-your-wallet/"
                  }
                >
                  Here
                </Link>{" "}
                are the instructions for transferring money to metamask wallet.
                <br />
                Note: Please ensure to buy Ethereum with the money to ensure
                that you can use the money in your wallet on our website.
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/OtoymxLYQYU?si=HV44B3ZnV7Rz_BFP"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Want to know how to create a campaign?
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <p>
                There are a lot of ways for transferring money to a crypto
                wallet. We would recommend using metamask for beginners.{" "}
                <Link
                  className="text-primary underline"
                  href={
                    "https://metamask.io/news/latest/how-to-use-metamasks-buy-feature-to-fund-your-wallet/"
                  }
                >
                  Here
                </Link>{" "}
                are the instructions for transferring money to metamask wallet.
                <br />
                Note: Please ensure to buy Ethereum with the money to ensure
                that you can use the money in your wallet on our website.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HowItWorks;
