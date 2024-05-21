import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './Components/RegisterPage.jsx'
import TeamPlayersRegistration from './Components/TeamPlayersRegistration.jsx'
import SplashScreen from './Components/SplashScreen.jsx'
import Dashboard from './Components/Dashboard.jsx'
import NewBookingPage from './Components/NewBookingPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/teamPlayerRegistration" element={<TeamPlayersRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newBooking" element={<NewBookingPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  </React.StrictMode>,
)
