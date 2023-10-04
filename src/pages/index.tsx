import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex  min-h-screen flex-col px-24 py-8 ${inter.className} `}
    >
      <nav className="flex flex-row justify-between">
        <p>FundMe</p>
        <ThemeSwitch />
      </nav>
    </main>
  );
}
