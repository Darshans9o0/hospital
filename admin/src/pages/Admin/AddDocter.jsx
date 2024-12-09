import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axsios from "axios";

const AddDocter = () => {
  // state varibkes to store
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("GENRAL PHYSICIAN");
  const [degree, setDegree] = useState("");
  const [addres1, setAddres1] = useState("");
  const [addres2, setAddres2] = useState("");
  // calling the api
  const { backendUrl, aToken } = useContext(AdminContext);

  // adding a function for submit button to work
  const submitHandler = async (event) => {
    event.preventDefault(); // Prevents from reloading the page
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append(
        "addres1",
        JSON.stringify({ line1: addres1, line2: addres2 })
      );
      formData.append("about", about);
      // consle log form dat
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      //    fetching the data from backed
      const { data } = await axsios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
        
      );
      //console.log("data from backend",data)
      if (data.success) {
        toast.success(data.message);
        setDocImg(false)
        setName('')
        setPassword('')
        setAbout('')
        setDegree('')
        setEmail('')
        setFees('')
        setAddres1('')
        setAddres2('')
        setExperience('')
        setSpeciality('')
    
      } else {
        toast.error(data.message);
      }
      console.log("API Request URL:", backendUrl + "api/admin/add-doctor");
      console.log("Headers:", { aToken });
      console.log("FormData:");
      formData.forEach((value, key) => console.log(`${key}:`, value));
    } catch (error) {}
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6"
    >
      <p className="text-2xl font-semibold text-center text-gray-800">
        Add Doctor
      </p>

      {/* Upload Section */}
      <div className="text-center">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload Area"
            className="w-28 h-28 mx-auto rounded-full border-2 border-dashed border-gray-300"
          />
        </label>
        <input
          onChange={(e) => setDocImg(e.target.files[0])}
          type="file"
          id="doc-img"
          hidden
        />
        <p className="text-gray-600 text-sm mt-2">Upload Doctor's Picture</p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* <div>
      <label className="block text-sm font-medium text-gray-700">Your Name</label>
      <input
      onChange={(e) => setName(e.target.value) } value={name}
        type="text"
        placeholder="Your Name"
        required
        className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor's Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Doctor's Name"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor's Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Doctor's Email"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience
          </label>
          <select
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
            <option value="5 years">5 years</option>
            <option value="6 years">6 years</option>
            <option value="7 years">7 years</option>
            <option value="8 years">8 years</option>
            <option value="9 years">9 years</option>
            <option value="10 years">10 years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fees
          </label>
          <input
            onChange={(e) => setFees(e.target.value)}
            value={fees}
            type="number"
            placeholder="Fees"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Speciality
          </label>
          <select
            onChange={(e) => setSpeciality(e.target.value)}
            value={speciality}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="General physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Education
          </label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            type="text"
            placeholder="Education"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            onChange={(e) => setAddres1(e.target.value)}
            value={addres1}
            type="text"
            placeholder="Address Line 1"
            required
            className="w-full mt-1 mb-2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setAddres2(e.target.value)}
            value={addres2}
            type="text"
            placeholder="Address Line 2"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about the doctor"
            rows="5"
            required
            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDocter;
