import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docID }) => {
 // console.log(docID);

  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
   if(doctors.length > 0 && speciality){
    const doctorsData = doctors.filter((doc)=> doc.speciality ===speciality && doc._id !== docID )
    setRelDoc(doctorsData)
   }
  }, [doctors, speciality, docID]);  
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10' >
     <h1 className='text-3xl font-bold'>Related Doctors</h1>
     <p className='sm:w-1/3  text-center text-sm '>Simply browse through our extensive list of trusted doctors.</p>
     <div className='w-full grid grid-cols-auto gap-4 pt-4 gap-y-6 px-3 sm:px-3'>
        {relDoc.slice(0,5).map((item , index)=> (
            <div key={item._id} onClick={()=>{navigate `/appointment/${item._id} ` ; scrollTo(0,0) } } className='border border-blue-200 rounded-xl overflow-hidden hover:scale-105  ease-out hover:shadow-xl transition-transform duration-300 cursor-pointer' >
                <img className='bg-blue-50 ' src={item.image} alt="" />
                <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? ' text-green-700' : 'text-gray-500'}`}>
              <p className={`w-2 h-2 ${item.available  ?  ' bg-green-800' : 'bg-gray-500'} rounded-full`}></p>
              <p>{item.available ? 'avaliable' : 'Not Avaliable'} </p>
            </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-900 text-sm'> { item.speciality}</p>
                </div>
            </div>
            
        ))}
     </div>
    

        </div>
  )
}

export default RelatedDoctors