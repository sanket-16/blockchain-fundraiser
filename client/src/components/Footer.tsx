import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="w-full  border-muted border-t-2 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold text-primary/50">FundMe</h3>
        <div className="flex gap-4">
          <RiInstagramFill
            size={30}
            className="hover:text-primary hover:cursor-pointer text-foreground/60"
          />
          <FaXTwitter
            size={30}
            className="hover:text-primary hover:cursor-pointer text-foreground/60"
          />
        </div>
      </div>
      <div className="py-8 text-foreground/60 grid md:grid-cols-2 grid-cols-1">
        <ul className="flex flex-col gap-4">
          <li className="hover:text-primary hover:cursor-pointer">Home</li>
          <li className="hover:text-primary hover:cursor-pointer">Discover</li>
          <li className="hover:text-primary hover:cursor-pointer">
            Create Fundraiser
          </li>
          <li className="hover:text-primary hover:cursor-pointer">
            How It Works
          </li>
        </ul>
        <ul className="flex flex-col gap-4">
          <li className="hover:text-primary hover:cursor-pointer">Terms</li>
          <li className="hover:text-primary hover:cursor-pointer">
            Privacy Policy
          </li>
        </ul>
      </div>
      <p className="pt-2 pb-8 text-center text-primary/50">© FundMe - 2023</p>
    </div>
  );
};

export default Footer;
