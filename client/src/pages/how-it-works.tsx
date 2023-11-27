import Link from "next/link";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-4">
        <p className="font-bold">
          Don&#39;t know how to use blockchain or setup a Metamask wallet?
        </p>
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
      <div className="flex flex-col gap-4 p-4">
        <p className="font-bold">
          Don&#39;t know how to add money to your Metamask Wallet?
        </p>
        <p>
          There are a lot of ways for transferring money to a crypto wallet. We
          would recommend using metamask for beginners.{" "}
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
          Note: Please ensure to buy Ethereum with the money to ensure that you
          can use the money in your wallet on our website.
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
    </div>
  );
};

export default HowItWorks;
