import ThemeSwitch from "./theme-switcher";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between pb-8 pt-4">
      <h3 className="text-lg font-bold">FundMe</h3>
      <ThemeSwitch />
    </nav>
  );
};

export default Navbar;
