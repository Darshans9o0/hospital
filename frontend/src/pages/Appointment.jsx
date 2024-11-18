import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from'../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndx, setSlotIndx] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Fetch Doctor Information
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log("Fetched Doctor Info:", docInfo);
  };

  // Get Available Slots for the Next 7 Days
  const getAvailableSlot = async () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // Get the current date for the slot
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the end time (9 PM)
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Set the start time based on the current time
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlot = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add the slot to the array
        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add the generated slots for the current date if not empty
      if (timeSlot.length > 0) slots.push(timeSlot);
    }

    // Set the state once after generating all slots
    setDocSlot(slots);
  };

  // Fetch doctor info when component mounts or when `doctors` or `docId` changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Fetch available slots once the doctor info is loaded
  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  // Log the slots for debugging
  useEffect(() => {
    console.log("Available Slots:", docSlot);
  }, [docSlot]);

  return docInfo && (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-[-80px] sm:mt-0'>
          {/* Info Section */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-950'>
            {docInfo.name} <img src={assets.verified_icon} alt="" />
          </p>
          <div>
            <p className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-xs font-medium text-gray-600 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fees: <span>{currencySymbol} {docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600'>
        <p>Booking Slot</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length > 0 && docSlot.map((item, index) => (
            <div
              onClick={() => setSlotIndx(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndx === index ? 'bg-primary text-white' : 'border border-gray-400'}`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {docSlot[slotIndx] && (
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {docSlot[slotIndx].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-700 border border-gray-500'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
        )}
        <div>
          <button className='mt-5 text-white bg-primary rounded-full px-14 py-3'>
            Book an Appointment
          </button>
        </div>
      </div>
      {/* listing rlated docors */}
      <RelatedDoctors  docId={docId} speciality={docInfo.speciality}   />
    </div>
  );
};

export default Appointment;
