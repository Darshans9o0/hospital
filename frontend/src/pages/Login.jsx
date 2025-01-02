import React, { useContext, useEffect, useState   } from 'react';
import { AppContext } from '../context/AppContext';
import axios from"axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const {backendUrl , token , setToken} = useContext(AppContext)
const navigate = useNavigate()
  const [state, setState] = useState('Sign UP');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect( () => {
    if(token) {console.log("going to /")
      navigate('/')
    }

  },[dToken])

  // Handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      if (state === 'Sign UP') {
        const {data} = await axios.post(`${backendUrl}/api/user/register`, {name , password , email})
        if(data.success){
          localStorage.setItem('token'  , data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(`${backendUrl}/api/user/login`, {password , email})
        if(data.success){
          localStorage.setItem('token'  , data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      
    }

    // Determine the endpoint based on the state (Sign UP or Login)
  }



  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        {/* Heading */}
        <p className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {state === 'Sign UP' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-gray-600 mb-8 text-center">
          Please {state === 'Sign UP' ? 'sign up' : 'log in'} to book an appointment
        </p>

        {/* Full Name Input (only for Sign UP) */}
        {state === 'Sign UP' && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {state === 'Sign UP' ? 'Create Account' : 'Login'}
        </button>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        {/* Toggle Between Sign UP and Login */}
        {state === 'Sign UP' ? (
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState('Login')}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState('Sign UP')}
            >
              Sign up here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
