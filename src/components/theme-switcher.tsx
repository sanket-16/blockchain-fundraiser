import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { HiOutlineSun } from "react-icons/hi";
import { BsFillMoonFill } from "react-icons/bs";
import { HiComputerDesktop } from "react-icons/hi2";
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      name: "system",
      icon: <HiComputerDesktop size={22} />,
    },
    {
      name: "dark",
      icon: <BsFillMoonFill size={22} />,
    },
    { name: "light", icon: <HiOutlineSun size={22} /> },
  ];

  return (
    <div>
      <button
        className="rounded-md p-4 focus:border-foreground border border-muted m-2 hover:bg-secondary"
        onClick={() => setMenu((val) => !val)}
      >
        {theme === themes[0].name && themes[0].icon}
        {theme === themes[1].name && themes[1].icon}
        {theme === themes[2].name && themes[2].icon}
      </button>
      {menu && (
        <div className="fixed rounded-md p-2 border border-muted bg-background">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className="flex gap-4 items-center p-2 hover:bg-secondary w-full rounded-md"
              onClick={() => {
                setTheme(theme.name);
                setMenu(false);
              }}
            >
              <span>{theme.icon}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
