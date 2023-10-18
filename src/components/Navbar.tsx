import Link from "next/link";
import ThemeSwitch from "./theme-switcher";
import { HiMenu } from "react-icons/hi";
import { BiSolidWallet } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { useSDK } from "@metamask/sdk-react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState("");
  const {
    sdk,
    connected,
    connecting,
    provider,
    chainId,
    status,
    ready,
    balance: walletBalance,
  } = useSDK();
  const menuOptions = [
    {
      name: "Discover",
      link: "/discover",
    },
    {
      name: "Create Fundraiser",
      link: "/create-fundraiser",
    },
    {
      name: "How It Works",
      link: "/",
    },
  ];
  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      // setAccount(accounts?.[0]);
      setBalance(String(walletBalance));
      console.log(status);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <nav className="grid place-items-center pb-4 pt-4 w-full ">
      <div className="lg:flex hidden w-full items-center justify-between">
        <Link className="text-lg font-bold" href="/">
          FundMe
        </Link>
        <div className="flex  flex-1 items-center justify-center px-40">
          <div className="flex gap-8 flex-nowrap flex-1">
            {menuOptions.map((option) => (
              <Link
                key={option.name}
                href={option.link}
                className="p-2 w-full hover:bg-secondary rounded-md text-center "
              >
                {option.name}
              </Link>
            ))}
          </div>
        </div>
        <ThemeSwitch />
        <button
          className="border border-muted p-4 rounded-md hover:bg-secondary hover:cursor-pointer"
          onClick={() => connect()}
        >
          {connected && (
            <p>
              {account?.slice(0, 6)}...{account?.slice(-6)}
            </p>
          )}
          {ready && !connected && (
            <p className="">
              <BiSolidWallet size={22} />
            </p>
          )}
        </button>
      </div>
      <div className="lg:hidden flex flex-row justify-between items-center gap-20 w-[80vw]">
        <Link className="text-lg font-bold" href="/">
          FundMe
        </Link>
        <div className="flex gap-2 items-center ">
          <ThemeSwitch />
          <button
            className="border border-muted p-4"
            onClick={() => setMenu((val) => !val)}
          >
            <HiMenu size={24} />
          </button>
          {menu && (
            <div className="fixed top-0 border border-muted right-0 w-[100vw] h-[100vh] bg-background p-10">
              <div className="flex justify-between pb-10">
                <h3 className="font-bold text-lg">FundMe</h3>
                <button onClick={() => setMenu(false)}>
                  <RxCross2 size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {menuOptions.map((option) => (
                  <Link
                    key={option.name}
                    href={option.link}
                    className="p-4 w-full hover:bg-secondary rounded-md"
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <>
          {chainId && `Connected chain: ${chainId}`}
          <p></p>
          {account && `Connected account: ${account}`}
          {balance && `Balance: ${balance}`}
        </>
      </div>
    </nav>
  );
};

export default Navbar;
