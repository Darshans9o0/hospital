import React, { useContext, useEffect } from 'react'
import { DocterContext } from '../../context/DocterContext'
import {AppContext} from '../../context/AppContext'
import {assets} from '../../assets/assets'

const DoctorAppointment = () => {

  const {dtoken , appointment ,getAppointment , cancelAppointment , completeAppointment} = useContext(DocterContext)

  const { calclateAge , slotDateFormat ,  currency }  = useContext(AppContext)

  useEffect(() => {
    if (dtoken) {
      getAppointment()
      
    }
  },[dtoken])
  


  return (
    <div className=' w-full max-w-6xl m-5'>
      <p className=' mb-3 text-lg font-medium'> All Appointment</p>
      <div className='bg-white border rounded text-sm max-v-[80vh] min-h[50vh] overflow-hidden'>
        <div className=' max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

         {
          appointment.reverse().map((item  , index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base  sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 item-center text-gray-500 py-6 px-3 border-b hover:bg-gray-50 ' key={index}>
              <p className='max-sm:hidden '>{index + 1}</p>
              <div className='flex items-center gap-2'>
              <img  className='w-8 rounded-full' src={item.userData.image} alt="" />   <p>{item.userData.name}</p>

              </div>
              <div>
                <p className='text-sm inline border border-blue-600 px-2 rounded-full'> {item.payment ? 'Online'  : 'Cash'}  </p>
                
                
              </div>
              <p  className='max-sm:hidden '>{calclateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
              <p>{currency} {item.ammount}</p>

              {
                item.
                cancelled
                ? <p className='text-red-400 text-sm font-bold'> Cancelled</p>
                : item.isCompleted 
                ? <p className='text-green-600  test-sm font-bold'>Completed</p>
                : <div className='flex'>
                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img   onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
              }
              
              

            </div>
            
          ))
         }
      </div>
    </div>
  )
}

export default DoctorAppointment