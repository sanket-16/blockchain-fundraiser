import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4">
      <p className="font-bold text-2xl">Oops! Something went wrong!</p>
      <Link
        href={"/"}
        className="flex gap-2 items-center p-4 border-2 border-muted rounded-md hover:bg-secondary"
      >
        <FaArrowLeft size={20} />
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
