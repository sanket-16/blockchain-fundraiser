import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import Link from "next/link";

function Login() {
  const [menu, setMenu] = useState<boolean>(false);
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect({
    connector: new InjectedConnector(),
    chainId: 31337,
  });
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();

  const handleLogin = async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in to FundMe..",
        uri: window.location.origin,
        version: "1",
        chainId: 31337,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session && !isConnected) {
      connect({ connector: connectors[0] });
    }
    if (!isConnected) {
      handleLogin();
    }
    console.log(isConnected);
  }, [isConnected, session]);

  return (
    <div className="relative">
      {status === "unauthenticated" && (
        <button
          className={` ${
            status === "unauthenticated" && `border-2 `
          } border-muted  rounded-md p-4 hover:cursor-pointer hover:bg-secondary`}
          onClick={(e) => {
            e.preventDefault();

            if (!isConnected) {
              connect({ connector: connectors[0] });
            } else {
              handleLogin();
            }
          }}
        >
          Sign-in
        </button>
      )}
      {status === "authenticated" && (
        <button
          className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-blue-500"
          onClick={() => setMenu((prevValue) => !prevValue)}
        ></button>
      )}
      {menu && (
        <div className="w-48 bg-background absolute z-10 right-0 top-16 border border-muted p-2 rounded-md">
          <Link
            href={"/profile"}
            className="hover:bg-secondary rounded-md p-4 w-full text-start flex items-center gap-4"
          >
            <IoIosPerson size={25} /> Profile
          </Link>
          <button
            className="hover:bg-secondary rounded-md p-4 w-full text-start flex items-center gap-4"
            onClick={(e) => {
              e.preventDefault();
              if (session) {
                if (isConnected) {
                  disconnect();
                }
                signOut();
              }
            }}
          >
            <IoLogOut size={25} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;
