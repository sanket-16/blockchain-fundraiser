import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createConfig, mainnet, sepolia } from "wagmi";
import { createPublicClient, http } from "viem";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <WagmiConfig config={config}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Navbar />
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
