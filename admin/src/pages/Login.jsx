import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets.js"
import { AdminContext } from '../context/AdminContext.jsx'
import axios from "axios"
import { toast } from 'react-toastify'
import { DocterContext } from '../context/DocterContext.jsx'

const Login = () => {

  const [state , setState] = useState('Admin') // y admin coz its default wn we ever login 
  const [email , SetEmail] = useState('')
  const [password , SetPassword] = useState('')

  const {setAToken , backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DocterContext)

  const onSubmitHandler = async (event) => { 
    event.preventDefault()
    try {
       if(state === 'Admin'){
        
        const {data} = await axios.post(backendUrl + '/api/admin/login' , {email , password})
        if(data.success) {
          localStorage.setItem('aToken' , data.token)
         setAToken(data.token);
          
        } else {
          toast.error(data.message)
        }

       } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login' , {email , password})

        if(data.success) {
          localStorage.setItem('dtoken' , data.token)
         setDToken(data.token);
         //console.log(data.token);
         
        } else {
          toast.error(data.message)
        }
         

       }

    } catch (error) {
      
    }

  }





  return (
<form  onSubmit={onSubmitHandler} className="bg-white p-6 max-w-sm mx-auto rounded-lg shadow-md mt-6 ">
  <div>
    <p className="text-xl font-semibold text-blue-500 mb-4 text-center  ">
      <span>{state}</span> login
    </p>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <input
      onChange={ (e) => SetEmail(e.target.value)}
      value={email}
        type="email"
        required
        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <input
       onChange={ (e) => SetPassword(e.target.value)}
       value={password}
        type="password"
        required
        className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      Login
    </button>
   
    {
      state === 'Admin' ? 
        <p className="text-gray-700 text-base font-medium text-center">
          Doctor login?
          <span
            className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setState('Docter')}
          >
            click here
          </span>
        </p>
      : 
        <p className="text-gray-700 text-base font-medium text-center">
          Admin login?
          <span
            className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setState('Admin')}
          >
            click here
          </span>
        </p>
      
    }
    
   
  </div>
</form>

  )
}

export default Login