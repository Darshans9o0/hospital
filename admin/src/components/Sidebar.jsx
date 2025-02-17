import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DocterContext } from '../context/DocterContext'

const Sidebar = () => {
  const {aToken} = useContext(AdminContext)
  const {dtoken} = useContext(DocterContext)
  return (
    <div
    className="min-h-screen bg-white border-right"
  >
    {/* Sidebar Content */}
    {aToken && (
      <ul className="flex flex-col space-y-4 mt-4 px-4">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.home_icon} alt="Home" className="w-5 h-5" />
          <span  className='hidden md:block'>Dashboard</span>
        </NavLink>
  
        {/* Appointments */}
        <NavLink
          to="/all-appointments"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
          <span  className='hidden md:block'>Appointments</span>
        </NavLink>
  
        {/* Add Doctor */}
        <NavLink
          to="/add-doctor"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
          <span  className='hidden md:block'>Add Doctor</span>
        </NavLink>
  
        {/* Doctor List */}
        <NavLink
          to="/doctor-list"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.people_icon} alt="Doctor List" className="w-5 h-5" />
          <span>Doctor List</span>
        </NavLink>
      </ul>
    )}
    {/* Sidebar Content */}
      {   dtoken && (
      <ul className="flex flex-col space-y-4 mt-4 px-4">
        {/* Dashboard */}
        <NavLink
          to="/doctor-dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.home_icon} alt="Home" className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
  
        {/* Appointments */}
        <NavLink
          to="/doctor-appointments"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
          <span>Appointments</span>
        </NavLink>
  
        {/* Add Doctor */}
      
        {/* Doctor List */}
        <NavLink
          to="/doctor-profile"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 gap-3 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 text-blue-400' : ''
            }`
          }
        >
          <img src={assets.people_icon} alt="Doctor List" className="w-5 h-5" />
          <span> Profile </span>
        </NavLink>
      </ul>
    )}
  </div>
  )
}  


export default Sidebar