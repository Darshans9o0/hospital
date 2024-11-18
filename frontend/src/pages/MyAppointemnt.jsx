import React, { useContext, useState } from 'react'
import { AppContext} from "../context/AppContext"

const MyAppointemnt = () => {
  const {doctors} = useContext(AppContext)
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

  {doctors.slice(0, 2).map((item, index) => (
    <div
      key={index}
      className="flex flex-col lg:flex-row items-start justify-between bg-white border border-gray-300 shadow-lg rounded-lg p-4 mb-6"
    >
      {/* Doctor's Image */}
      <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-36 object-cover rounded-md"
        />
      </div>

      {/* Doctor's Info */}
      <div className="flex-1 lg:mx-6">
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="text-gray-600">{item.speciality}</p>
        <div className="mt-4">
          <p className="font-medium">Address:</p>
          <p>{item.address.line1}</p>
          <p>{item.address.line2}</p>
          <p className="mt-4">
            <span className="font-medium">Date & Time:</span> 25, July, 2024 | 8:30 AM
          </p>
        </div>
      </div>

      {/* Action Buttons - Vertical Alignment */}
      <div className="flex flex-col items-end gap-3 lg:ml-auto">
        <button className="bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition text-sm">
          Pay Online
        </button>
        <button className="bg-red-500 text-white py-1.5 px-3 rounded-md hover:bg-red-600 transition text-sm">
          Cancel Appointment
        </button>
      </div>
    </div>
  ))}
</div>

  )
}

export default MyAppointemnt