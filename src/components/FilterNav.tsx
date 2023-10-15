import {useState} from 'react';
import {BiFilterAlt} from "react-icons/bi";
import {AiOutlineCaretDown,AiOutlineCaretUp} from "react-icons/ai";

const FilterNav = () => {
    

  return (
    <div>
        <div className= {'flex flex-row justify-between h-15  mt-6   bg-slate-300 rounded-box'}>
            <div className='flex flex-row gap-2'>
                <BiFilterAlt size={40}/> 
                <p className={'mt-2 text-lg' }>Filters</p>
            </div>
            
            <div className={' flex   justify-around'}>
            </div>
        </div>
    </div>
  )
}

export default FilterNav;