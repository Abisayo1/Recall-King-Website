import React from 'react';
import Accordion from './Accordion';

const FAQ = () => {
  return (
    <section id="faq">
      
    <div className=" flex flex-col max-w-[1200px] w-[90%] mx-auto justify-center">
      {/* Banner Section */}
      
      <div className=" mx-auto relative   mt-10 ">
        <img src="./Content.png" className=' rounded-xl w-full mx-auto max-h-[500px]' alt="" />
        <div className="overlay rounded-xl absolute h-full w-full top-0 bg-[#2563eb] "></div>
        <div className="overlay-text  absolute inset-0 flex text-white flex-col justify-center items-center ">
          <div className='text-2xl sm:text-5xl font-MontserratBold py-5 ' >FAQs</div>
          
        </div>
      </div>

      {/* Content Section */}
      <div className=" my-10  ">
        
      <div className='sm:text-3xl text-xl  font-MontserratBold mx-auto max-w-[1000px] text-[#2563eb] ' > Frequently Asked Questions</div>
      <Accordion title='Where does Recall King get its data?' text='From publicly available and trusted APIs such as OpenFDA' />
      <Accordion title='Is my information secure?' text='Yes it is. Recall King do not sell your data to any third party' />
      <Accordion title='Does it work outside the U.S.?' text='Recall King works in any part of the world' />
      </div>
    </div>
    </section>
  );
};

export default FAQ;