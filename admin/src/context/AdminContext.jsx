import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, SetAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [ doctors, setDoctors ] = useState([]); // y array coz we get data in array
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   console.log('backendUrl:', backendUrl);
//   console.log('aToken:', aToken);
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      console.log('API Response:', data.doctors);
     

      console.log(data.doctors);
       console.log("Fetching doctors...");
  console.log("Doctors List:", doctors);

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const changeAvailability = async(docId)=>{
    try {
      const { data} = await axios.post(backendUrl + '/api/admin/change-available' ,{docId} , {headers :  {aToken}})
      if(data.success) {
        toast.success(data.message)
        getAllDoctors()
      } else {
        toast.error(error.message)
      }
      
    } catch (error) {
      toast.error(error.message);
    }

  }
  const value = {
    aToken,
    SetAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability
  };
  
  console.log("Admin context", value)
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminContextProvider;
