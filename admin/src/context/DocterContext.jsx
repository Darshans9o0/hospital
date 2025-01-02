import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DocterContext = createContext();

const DocterContextProvider = (props) => {
  const backendURl = import.meta.env.VITE_BACKEND_URL;

  const [dtoken, setDToken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );
  const [appointment, setAppointment] = useState([]);
  const [dashdata, setDashData] = useState(false);
  const [profileData, setProfile] = useState(false);

  const getAppointment = async () => {
    try {
      //console.log("getappointment",dtoken)
      const { data } =  await axios.get(
        backendURl + "/api/doctor/appointments",
        { headers: { dtoken } }
      );

      if (data.success) {
        setAppointment(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURl + "/api/doctor/complete-appointments",
        { appointmentId },
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURl + "/api/doctor/cancel-appointments",
        { appointmentId },
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getDashdData = async () => {
    try {
      const { data } = await axios.get( backendURl +"/api/doctor/doc-dashboard", {
        headers: { dtoken },
      });
      if (data.success) {
        setDashData(data.dashData);                
      } else {
        console.log(error);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async() => {
    try {
      const { data } = await axios.get( backendURl +"/api/doctor/doc-profile", {
        headers: { dtoken },
      });
      if (data.success) {
        setProfile(data.profileData);
        console.log(data.profileData);
        
        
        
      } else {
        console.log(error);
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  const value = {
    dtoken,
    setDToken,
    backendURl,
    appointment,
    setAppointment,
    getAppointment,
    cancelAppointment,
    completeAppointment,
    dashdata,
    getDashdData,
    setDashData,
    profileData ,
    setProfile,
    getProfileData
  };
  return (
    <DocterContext.Provider value={value}>
      {props.children}
    </DocterContext.Provider>
  );
};
export default DocterContextProvider;
