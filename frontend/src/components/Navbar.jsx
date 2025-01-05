import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets.js"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
   const navigate = useNavigate() // to navgiate through login line : 33

   const [showMenu  , setShowMenu] = useState(false)
    // const [token , setToken] = useState(true) made for temparay

    const {token , setToken} = useContext(AppContext)
    const logout = () => {
      setToken(false)
      localStorage.removeItem('token')

    }
    return (
        
        
          
            <div className="flex items-center justify-between text-sm py-4 px-6 bg-white border-b border-gray-300 shadow-md">
              {/* Logo */}
              <img
                onClick={() => {
                  navigate('/');
                  window.scrollTo(0, 0);
                }}
                className="w-36 cursor-pointer"
                src={assets.logo}
                alt="Logo"
              />
        
              {/* Desktop Menu */}
              <ul className="hidden md:flex items-center gap-8 font-medium">
                <NavLink to="/" className="hover:text-blue-600">
                  <li className="py-1">Home</li>
                </NavLink>
                <NavLink to="/doctors" className="hover:text-blue-600">
                  <li className="py-1">All Doctors</li>
                </NavLink>
                <NavLink to="/about" className="hover:text-blue-600">
                  <li className="py-1">About</li>
                </NavLink>
                <NavLink to="/contact" className="hover:text-blue-600">
                  <li className="py-1">Contact</li>
                </NavLink>
              </ul>
        
              {/* Right Section */}
              <div className="flex items-center gap-6">
                {token ? (
                  <div className="relative flex items-center gap-2 cursor-pointer group">
                    <img className="w-8 h-8 rounded-full" src={assets.profile_pic} alt="Profile" />
                    <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
                    {/* Profile Dropdown */}
                    <div className="absolute top-full right-0 pt-2 text-base font-medium text-gray-700 bg-gray-100 rounded-lg shadow-lg hidden group-hover:block">
                      <div className="flex flex-col p-3">
                        <p
                          onClick={() => navigate('/my-profile')}
                          className="hover:text-black cursor-pointer py-1"
                        >
                          My Profile
                        </p>
                        <p
                          onClick={() => navigate('/my-appointment')}
                          className="hover:text-black cursor-pointer py-1"
                        >
                          Appointment
                        </p>
                        <p
                          onClick={logout}
                          className="hover:text-black cursor-pointer py-1"
                        >
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hidden md:block"
                  >
                    Create Account
                  </button>
                )}
        
                {/* Mobile Menu Icon */}
                <img
                  onClick={() => setShowMenu(true)}
                  className="w-6 cursor-pointer md:hidden"
                  src={assets.menu_icon}
                  alt="Menu"
                />
              </div>
        
              {/* Mobile Menu */}
              {showMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center md:hidden">
                  <div className="bg-white w-3/4 max-w-xs rounded-lg shadow-lg p-6 relative">
                    {/* Close Icon */}
                    <img
                      onClick={() => setShowMenu(false)}
                      className="w-6 absolute top-4 right-4 cursor-pointer"
                      src={assets.cross_icon}
                      alt="Close"
                    />
                    {/* Mobile Links */}
                    <ul className="flex flex-col gap-4 mt-8">
                      <NavLink to="/" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
                        Home
                      </NavLink>
                      <NavLink to="/doctors" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
                        All Doctors
                      </NavLink>
                      <NavLink to="/about" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
                        About
                      </NavLink>
                      <NavLink to="/contact" onClick={() => setShowMenu(false)} className="hover:text-blue-600">
                        Contact
                      </NavLink>
                     
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        };
        
        
        

export default Navbar