import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
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
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
const queryClient = new QueryClient();

const { chains, publicClient } = configureChains([hardhat], [publicProvider()]);

const config = createConfig({
  connectors: [new InjectedConnector({ chains })],
  autoConnect: true,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class">
          <WagmiConfig config={config}>
            <Navbar />
            <div className="min-h-[80vh]">
              <Component {...pageProps} />
            </div>
            <Footer />
          </WagmiConfig>
        </ThemeProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
