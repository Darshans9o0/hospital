import React, { useState } from 'react'
import {assets} from "../assets/assets.js"
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
   const navigate = useNavigate() // to navgiate through login line : 33

   const [showMenu  , setShowMenu] = useState(false)
   const [token , setToken] = useState(true)
    return (
    <div className='flex items-center justify-between text-sm py-4 mb-4 border-b border-b-grey-400'>
     <img  className='w-44 cursor-pointer' src={assets.logo} alt="" />
     <ul className='hidde md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1 ' >Home</li>
            <hr  className='boder-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>

        <NavLink to='/doctors'>
            <li className='py-1 '>All Doctors</li>
            <hr className='boder-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/about'>
            <li className='py-1 '>About</li>
            <hr className='boder-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>

        <NavLink to='/contact'>
       
            <li className='py-1 '>Conatct</li>
            <hr className='boder-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        
     </ul>
     <div className='flex items-centre gap-4'>
     {
            token
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full ' src={assets.profile_pic} alt="" />
                <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
                <div className=' absolute top-0 right-0 pt-14 text-base font-medium text-gray-700 z-20 hidden group-hover:block'>
                    <div className='min-2 bg-gray-100  rounded-2xl flex flex-col  p-3' >
                        <p onClick={()=> navigate ('/my-profile')} className='hover:text-black cursor-pointer'  >MY PROFILE</p>
                        <p onClick={()=> navigate ('/y-appointment')} className='hover:text-black cursor-pointer' > APPOINTMENT</p>
                        <p onClick={()=> setToken(false)} className='hover:text-black cursor-pointer' >LOGOUT</p>
                    </div>
                </div>
            </div>
            : <button onClick={() =>navigate('/login')} className='bg-primary text-white px-6 py-3  rounded-full  font-bold hidden md:block'>Create Account</button>
            
           
        }
        </div>
           



    </div>
  )
}

export default Navbar