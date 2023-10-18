import { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const categories = [
  "Environment",
  "Businesses",
  "Community",
  "Family",
  "Sports",
  "Events",
  "Others",
];
const FilterNav = () => {
  const [menu, setMenu] = useState<boolean>(false);
  return (
    <div className="flex flex-row justify-between gap-2 p-4 border-2 rounded-md border-muted">
      <div className="flex items-center gap-2">
        <BiFilterAlt size={40} />
        <p className="mt-2 text-lg">Filters</p>
      </div>
      <div>
        <button
          className="flex items-center gap-2 hover:bg-secondary p-4 rounded-md"
          onClick={() => setMenu((val) => !val)}
        >
          <span>Fundraise For</span>
          {menu ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
        </button>
        {menu && (
          <div className="fixed bg-background p-8 rounded-md grid grid-cols-2 gap-4 right-8 border border-muted ">
            {categories.map((category, index) => (
              <p
                key={index}
                className="p-4 w-full hover:cursor-pointer hover:bg-secondary rounded-md"
              >
                {category}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterNav;
