import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointemnt = () => {
  const { backendUrl , token , getDoctorData  } = useContext(AppContext);

  // state variable to store data
  const [appointments , setAppointments] = useState([]);

  // to display time datae month properly
  const months = [ "" , "JAN" , "FEB" , "MAR" , "APRIL" , "MAY" , "JUNE" , "JULY" , "AUG" , "SEP" , "OCT" , "NOV" , "DEC"]
  
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + '' + months[Number(dateArray[1])] + " " + dateArray[2]
  }
  const getUserAppointment = async () => { 
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      });
  //    console.log(data.data)
      
      if (data.success) {     
        setAppointments(data.data.reverse());
        //console.log("API Response:", data.appointments); 

       
      //  console.log("appoitment" , data.appointments);       
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async(appointmentId) => {
    try {
     const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId} ,  {headers : {token}})

     if(data.success){
      toast.success(data.message)
      getUserAppointment()
      getDoctorData()
     } else {
      toast.error(data.message)
     }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment()
      
    }

  },[token])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.slice(0, 4).map((item, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex-row items-start justify-between bg-white border border-gray-300 shadow-lg rounded-lg p-4 mb-6"
        >
          {/* Doctor's Image */}
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-full h-36 object-cover rounded-md"
            />
          </div>

          {/* Doctor's Info */}
          <div className="flex-1 lg:mx-6">
            <h3 className="text-xl font-semibold">{item.docData.name}</h3>
            <p className="text-gray-600">{item.docData.speciality}</p>
            <div className="mt-4">
              <p className="font-medium">Address:</p>
              <p>{item.docData.addres1.line1 || 'na'}</p>
              <p>{item.docData.addres1.line2 || 'na'}</p>
              <p className="mt-4">
                <span className="font-medium">Date & Time:</span>   {slotDateFormat(item.slotDate)} | {item.slotTime}
                
              </p>
            </div>
          </div>

          {/* Action Buttons - Vertical Alignment */}
          <div className="flex flex-col items-end gap-3 lg:ml-auto">
          {!item.cancelled  && item.payment && !item.isCompleted &&<button className="bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition text-sm">
              Pay Online
            </button> }
           {!item.cancelled  &&  !item.isCompleted && <button onClick={()=> cancelAppointment(item._id)} className="bg-red-500 text-white py-1.5 px-3 rounded-md hover:bg-red-600 transition text-sm">
              Cancel Appointment
            </button>} 
            {item.cancelled && !item.isCompleted&&   <button  className="sm:min-w-48 py-2 border-red-700 rounded font-extrabold text-red-500 mt-20"> Appointemnt Cancelled  </button>}
            {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 text-green-600">Completed</button>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointemnt;
