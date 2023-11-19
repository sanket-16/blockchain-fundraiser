import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { hardhat } from "wagmi/chains";
import { createPublicClient, http } from "viem";
import { JsonRpcProvider } from "ethers";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);

const config = createConfig({
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "...",
      },
    }),
  ],
  autoConnect: true,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <WagmiConfig config={config}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Navbar />
            <Component {...pageProps} />
          </SessionProvider>
        </WagmiConfig>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
