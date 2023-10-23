import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, status } = useSession();
  console.log(data);
  return (
    <main
      className={`flex  min-h-screen flex-col px-24 py-8 ${inter.className} `}
    >
      Hi
    </main>
  );
}
