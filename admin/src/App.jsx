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


const App = () => { 
  const {aToken} = useContext(AdminContext)

  return aToken ?  (
    <div className='bg-[#F8F9FD]'>     
     <ToastContainer/>
     <Navbar/>
     <div className='flex  items-start'>
      <Sidebar/>
      <Routes >
        <Route path='/' element={<> </>} />
        <Route path='/admin-dashboard' element={ <Dashboard/>} />
        <Route path='/all-appointments' element={ <AllAPpointmet/>} />
        <Route path='/add-doctor' element={ <AddDocter />} />
        <Route path='/doctor-list' element={ <DocterList/>} />
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