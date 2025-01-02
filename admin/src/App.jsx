import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAPpointmet from './pages/Admin/AllAPpointmet';
import AddDocter from './pages/Admin/AddDocter';
import DocterList from './pages/Admin/DocterList';
import { DocterContext } from './context/DocterContext';
import DoctorDashboard from './pages/Docter/DoctorDashboard';
import DoctorAppointment from './pages/Docter/Doctorappointment';
import DoctorProfile from './pages/Docter/DoctorProfile'


const App = () => { 
  const {aToken} = useContext(AdminContext)
  const {dtoken} = useContext(DocterContext)

  return aToken  || dtoken?  (
    <div className='bg-[#F8F9FD]'>     
     <ToastContainer/>
     <Navbar/>
     <div className='flex  items-start'>
      <Sidebar/>
      <Routes >
        {/* admin  route  */}
        <Route path='/' element={<></>} />
        <Route path='/admin-dashboard' element={ <Dashboard/>} />
        <Route path='/all-appointments' element={ <AllAPpointmet/>} />
        <Route path='/add-doctor' element={ <AddDocter />} />
        <Route path='/doctor-list' element={ <DocterList/>} />
        {/* doctor route  */}
        <Route path='/doctor-dashboard' element={ <DoctorDashboard/>} />
        <Route path='/doctor-appointments' element={ <DoctorAppointment/>} />
        <Route path='/doctor-profile' element={ <DoctorProfile/>} />
      </Routes>
     </div>

    </div>
  ) : (
    <>
     <Login />
     <ToastContainer/>
    </>
  )
}

export default App
