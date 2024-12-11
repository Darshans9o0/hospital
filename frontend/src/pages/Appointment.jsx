import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from'../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol , backendUrl , token , getDoctorData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndx, setSlotIndx] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  const navigate = useNavigate()

  // Fetch Doctor Information
  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
    console.log("Fetched Doctor Info:", docInfo);
  };

  // Get Available Slots for the Next 7 Days
  const getAvailableSlot = async () => {
    setDocSlot([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting next 7 days
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);

      // setting end time of date
      let endTime = new Date();
      endTime.setDate(currentDate.getDate());
      endTime.setHours(21, 0, 0, 0);

      // set hours
      if (today.getDate() === currentDate.getDate()) {
        // if currentTime > 10 then set available hours 1 after it
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // date is future date
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      // create slots
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let slotDate = day + "_" + month + "_" + year;
        let slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        // show only avilable slots to users
        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        /*  timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        }); */
        // increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlot[slotIndx][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "" + month + "" + year;

      const { data } = await axios.post(
       `${backendUrl}/api/user/book-appointments`,
        { docId, slotDate, slotTime },
        {
          headers: { token: token },
        }
      );
      if (data.success) {
        console.log("Appointment Booked");
        toast.success(data.message);
        getDoctorData();
        navigate("/my-appointments");
      } else {
        console.log("slot not booked", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Fetch doctor info when component mounts or when `doctors` or `docId` changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Fetch available slots once the doctor info is loaded
  useEffect(() => {console.log("doc info in effect",docInfo)
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
          <button onClick={bookAppointment} className='mt-5 text-white bg-primary rounded-full px-14 py-3'>
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
