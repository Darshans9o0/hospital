import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Docter = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600 text-lg font-semibold'>
        Browse through the doctors' Specialists
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Filter Section */}
        <div className='text-gray-600 flex flex-col gap-2 text-sm'>
          <p
            onClick={() =>
              speciality === 'General physician'
                ? navigate('/doctors')
                : navigate('/doctors/General physician')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            General physician
          </p>

          <p
            onClick={() =>
              navigate(speciality === 'Gynecologist' ? '/doctors' : '/doctors/Gynecologist')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            Gynecologist
          </p>

          <p
            onClick={() =>
              navigate(speciality === 'Dermatologist' ? '/doctors' : '/doctors/Dermatologist')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            Dermatologist
          </p>

          <p
            onClick={() =>
              speciality === 'Pediatricians'
                ? navigate('/doctors')
                : navigate('/doctors/Pediatricians')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            Pediatricians
          </p>

          <p
            onClick={() =>
              speciality === 'Neurologist'
                ? navigate('/doctors')
                : navigate('/doctors/Neurologist')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            Neurologist
          </p>

          <p
            onClick={() =>
              speciality === 'Gastroenterologist'
                ? navigate('/doctors')
                : navigate('/doctors/Gastroenterologist')
            }
            className='w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded-xl transition-all cursor-pointer'>
            Gastroenterologist
          </p>
        </div>

        {/* Doctors Listing */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden hover:scale-105 ease-out hover:shadow-xl transition-transform duration-300 cursor-pointer'>
              <img className='bg-blue-50' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-700'>
                  <p className='w-2 h-2 bg-green-800 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-900 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Docter





