import React, { useState } from "react";
import {assets} from "../assets/assets.js"
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  // User data state
  // const [userData, setUserData] = useState({
  //   name: 'Edward Vincent',
  //   image: assets.profile_pic,
  //   email: 'edwardv123@gmail.com',
  //   phone: '0000909900',
  //   address: {
  //     line1: '57th cross Richmond',
  //     line2: 'Circle, Church Road, LA',
  //   },
  //   gender: 'male',
  //   dob: '2000-01-01',
  // });
  const { userData,setUserdata , token , backendUrl , loadUserData } = useContext(AppContext);
 
  

  // Edit state
  const [isEdit, setIsEdit] = useState(false);
  const [image , setImage] = useState(false)

  const updateUserDetails = async () => {
    try {
      const formData = new FormData()
      formData.append('name' , userData.name)
      formData.append('phone' , userData.phone)
      formData.append('addres' ,JSON.stringify( userData.addres))
      formData.append('gender' , userData.gender)
      formData.append('dob' , userData.dob)

      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile' , formData , {headers : {token}})
      if (data.success) {
        toast.success(data.message)
         await loadUserData()
         setIsEdit(false)
         setImage(false)
      } else {
        toast.error(data.message)
      }
 
    } catch (error) {
      console.log(error);
      toast.error(error.message)   
      
    }

  }

  // Handle input changes
  const handleChange = (field, value) => {
    setUserdata((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (line, value) => {
    setUserdata((prev) => ({
      ...prev,  
      addres: { ...prev.addres, [line]: value },
    }));
    
  };


  //  y && coz if we hv userdta it will load or else it won't
  return (
    userData && (
      <div className="p-8 bg-gray-50 min-h-screen">
        {
          isEdit 
          ? <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className="w-10 absoute bottom-12 right-12" src={image ? '': assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />

          </label>
          : <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mr-6"
        />
        }
        {/* Profile Image */}
        <div className="flex items-center mb-6">
         
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border px-4 py-2 rounded-md"
            />
          ) : (
            <h2 className="text-2xl font-bold">{userData.name}</h2>
          )}
        </div>

        <hr className="mb-6" />

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="mb-4">
            <label className="block font-medium">Email</label>
            {isEdit ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border px-4 py-2 w-full rounded-md"
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Phone</label>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border px-4 py-2 w-full rounded-md"
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block font-medium">Address</label>
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={userData.addres.line1}
                  onChange={(e) => handleAddressChange("line1", e.target.value)}
                  className="border px-4 py-2 w-full rounded-md mb-2"
                  placeholder="Address Line 1"
                />
                <input
                  type="text"
                  value={userData.addres.line2}
                  onChange={(e) => handleAddressChange("line2", e.target.value)}
                  className="border px-4 py-2 w-full rounded-md"
                  placeholder="Address Line 2"
                />
              </>
            ) : (
              <p>
                {userData?.addres?.line1 || "N/A"},
                {userData?.addres?.line2 }
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block font-medium">Gender</label>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="border px-4 py-2 w-full rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Date of Birth</label>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="border px-4 py-2 w-full rounded-md"
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Edit / Save Buttons */}
        <div className="mt-6">
          {isEdit ? (
            <>
              <button
               onClick={updateUserDetails}                
                className="bg-green-500 text-white py-2 px-4 rounded-md mr-4"
              >
                SaveInformation
              </button>
              <button
               onClick={() => setIsEdit(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
