import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
       <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>CONTACT US</p>
       </div>

       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28  text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-bold text-gray-500'>OUR OFFICE</p>
          <p>00000 Willms Station <br />
          Suite 000, Washington, USA</p>
          <p>Tel: (000) 000-0000 <br />
          Email: hospital108@gmail.com</p>
          <p>CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore </button>
        </div>
       </div>


    </div>
  )
}

export default Contact