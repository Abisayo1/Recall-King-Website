import React, { useState } from 'react';
import { BiCaretDown, BiLogoLess, BiPlus } from 'react-icons/bi';
import { FaGreaterThan } from 'react-icons/fa6';

const Accordion = ({ title, text }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className=' mx-auto max-w-[1000px] w-full py-5 rounded-xl shadow-xl my-5 px-3 sm:px-10 bg-[#fafafa] '  >
            <div className='text-[#2563eb] text-4xl flex justify-between transition-all ease-in-out duration-500 ' >
                <p className='text-[#2563eb] text-lg sm:text-xl ' >{title}</p> <BiPlus className={`${open && 'rotate-45'} transition-all ease-in-out duration-300 `} onClick={()=>{setOpen(!open)}} />
            </div>
            <div className={` ${open? 'block' : 'hidden'}  `} >{text}</div>
        </div>
    );
}

export default Accordion;