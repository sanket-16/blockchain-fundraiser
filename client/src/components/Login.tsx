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
  // const { data: session, status } = useSession();
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
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      // signIn("credentials", {
      //   message: JSON.stringify(message),
      //   redirect: false,
      //   signature,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
    if (!isConnected) {
      handleLogin();
    }
    console.log(isConnected);
  }, [isConnected]);

  return (
    <div className="relative">
      {!isConnected && (
        <button
          className={` border-muted  rounded-md md:p-4 hover:cursor-pointer hover:bg-secondary`}
          onClick={(e) => {
            e.preventDefault();

            if (!isConnected) {
              connect({ connector: connectors[0] });
            } else {
              handleLogin();
            }
          }}
        >
          Sign In
        </button>
      )}
      {isConnected && (
        <button
          onClick={() => setMenu((prevValue) => !prevValue)}
          className="flex gap-2 items-center"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-blue-500"></div>
          <p className="md:hidden">{address}</p>
        </button>
      )}
      {menu && (
        <div className="md:w-48 w-full  bg-background absolute  z-50 md:right-0 md:top-16 top-16  border-2 border-muted p-2 rounded-md">
          <Link
            href={"/profile"}
            className="hover:bg-secondary rounded-md p-4 w-full text-start flex items-center gap-4"
            onClick={() => setMenu(false)}
          >
            <IoIosPerson size={25} /> Profile
          </Link>
          <button
            className="hover:bg-secondary rounded-md p-4 w-full text-start flex items-center gap-4"
            onClick={(e) => {
              const timer = setTimeout(() => {
                disconnect();
              }, 100);
              setMenu(false);
              e.preventDefault();

              if (isConnected) {
                clearTimeout(timer);
              }
              // signOut();
            }}
          >
            <IoLogOut size={25} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

export default Login;
