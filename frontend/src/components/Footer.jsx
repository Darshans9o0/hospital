import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className= " text-gray-900 py-8">
    {/* Main Container */}
    <div className="container mx-auto flex flex-col md:flex-row justify-between gap-10 p-6">
      {/* Left Section */}
      <div className="md:w-1/3 flex flex-col gap-4">
        <img src={assets.logo} alt="Logo" className="w-32" />
        <p className="text-gray-900 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      {/* Center Section (Navigation) */}
      <div className="md:w-1/3">
        <p className="text-lg font-semibold mb-4">Company</p>
        <ul className="space-y-2">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 cursor-pointer">About Us</li>
          <li className="hover:text-blue-400 cursor-pointer">Delivery</li>
          <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
        </ul>
      </div>

      {/* Right Section (Contact) */}
      <div className="md:w-1/3">
        <p className="text-lg font-semibold mb-4">Get in Touch</p>
        <ul className="space-y-2">
          <li className="hover:text-blue-400 cursor-pointer">0000-000-00-0</li>
          <li className="hover:text-blue-400 cursor-pointer">hospital108.com</li>
        </ul>
      </div>
    </div>

    {/* Bottom Section (Copyright) */}
    <div className="border-t border-gray-500 mt-6 pt-4 text-center">
      <p className="text-gray-900 text-sm">
        © 2024 Hospital - All Rights Reserved
      </p>
    </div>
  </footer>
  )
}

export default Footer