import Image from "next/image";
import { Inter } from "next/font/google";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col p-24 ${inter.className} `}>
      <div>hi</div>
      <div>
        <ThemeSwitch />
      </div>
    </main>
  );
}
