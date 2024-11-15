import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navgiate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg p-6 md:p-8 lg:p-10 gap-6  mb-[-0px]">
      {/* Left Side */}
      <div className="flex flex-col items-start gap-3 md:w-1/2">
        <div>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">
            Book Appointment
          </p>
          <p className="text-base md:text-lg text-gray-200 font-light mt-1">
            With 100+ Trusted Accounts
          </p>
        </div>
        <button onClick={()=> {navgiate('/login') ; scrollTo(0,0)}} className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white font-medium px-4 py-2 rounded-full transition-all duration-300 ease-in-out mt-3">
          Create Account
        </button>
      </div>

      {/* Right Side (Image) */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full max-w-[300px] rounded-md"
        />
      </div>
      
    </div>
    
);
};
    
  


export default Banner