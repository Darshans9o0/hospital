import React, { useContext, useEffect, useState } from "react";
import { DocterContext } from "../../context/DocterContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dtoken, profileData, setProfile, getProfileData , backendURl  } =
    useContext(DocterContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setEdit] = useState(false);

  const updateProfile = async() => {
    try {
      const updateData = {
        addres1 : profileData.addres1 ,
        fees : profileData.fees ,
        available : profileData.available
      } 
      const {data} = await axios.post(backendURl + "/api/doctor/doc-update-profile" , updateData , {headers : {dtoken}})
      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getProfileData()
      } else {
        toast.success(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
      
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-blue-600/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className=" flex-1 border border-stone-100  rounded-md p-8 py-7 bg-white ">
            {/* doc info naem degrre nd ex */}
            <p className="flex items-center gap-2 text-3xl text-gray-700">
              {profileData.name}
            </p>
            <div>
              <p className="flex items-center gap-2 mt-1">
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2  border text-xs  rounded-full">
                {profileData.experience}
              </button>
            </div>
            {/* doc - about */}
            <div>
              <p className="flex item-center  gap-1 test-sm font-medium text-neutral-800 mt-3">
                About:{" "}
              </p>
              <p className="text-sm text-gray-800 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className=" text-gray-500 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-800">
                {" "}
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, fees: e.target.value }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="flex gap-2 py-2">
              <p>Addres : </p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        addres1: { ...prev.addres1, line1: e.target.value },
                      }))
                    }
                    value={profileData.addres1.line1}
                  />
                ) : (
                  profileData.addres1.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        addres1: { ...prev.addres1, line2: e.target.value },
                      }))
                    }
                    value={profileData.addres1.line2}
                  />
                ) : (
                  profileData.addres1.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input onChange={() => isEdit && setProfile(prev => ({...prev , available : !prev.available}))} checked={profileData.available} type="checkbox" />
              <label htmlFor="">Avaliable</label>
            </div>
            {
              isEdit 
              ?<button
              onClick={updateProfile }
              className="px-4 py-1 border border-blue-500  text-sm rounded-full mt-5 hover:bg-blue-700 hover:text-white transition-all"
            >
              save
            </button>
            :             <button
            onClick={() => setEdit(true)}
            className="px-4 py-1 border border-blue-500  text-sm rounded-full mt-5 hover:bg-blue-700 hover:text-white transition-all"
          >
            Edit
          </button>
            }
            

          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
