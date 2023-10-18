import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { MetaMaskProvider } from "@metamask/sdk-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          logging: {
            developerMode: false,
          },
          checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </MetaMaskProvider>
    </ThemeProvider>
  );
}
