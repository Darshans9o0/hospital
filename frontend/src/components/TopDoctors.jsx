import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10' >
     <h1 className='text-3xl font-bold'>Top Doctors to Book</h1>
     <p className='sm:w-1/3  text-center text-sm '>Simply browse through our extensive list of trusted doctors.</p>
     <div className='w-full grid grid-cols-auto gap-4 pt-4 gap-y-6 px-3 sm:px-3'>
        {doctors.slice(0,10).map((item , index)=> (
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden hover:scale-105  ease-out hover:shadow-xl transition-transform duration-300 cursor-pointer' >
                <img className='bg-blue-50 ' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2  text-sm text-green-700'>
                        <p className='w-2 h-2 bg-green-800 rounded-full'></p> <p>Avaliable</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-900 text-sm'> { item.speciality}</p>
                </div>
            </div>
            
        ))}
     </div>
     <button onClick={()=>{navigate('/doctors') ; scrollTo(0,0)}} className="bg-white text-blue-600 border-2  px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
    More
  </button>

        </div>
  )
}

export default TopDoctors