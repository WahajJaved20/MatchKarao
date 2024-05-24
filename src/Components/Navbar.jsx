
import React, {useEffect, useState} from 'react';
import { logo} from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
    const navigate = useNavigate()
    const currentUrl = window.location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const [counter, setCounter] = useState(0);
    const [unreadNotifs, setUnreadNotifs] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
      localStorage.removeItem('token');
      toast.success('Logout Successful');
      navigate('/');
    }
    useEffect(()=>{
      async function getNotifications(){
          const result = await fetch(`https://match-karao-backend.vercel.app/getNotificationsExist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              teamID: localStorage.getItem("teamID")
            })
          }).then((resp) => resp.json());
          console.log(result)
          if (result.type === "Success" && result.notifications == true) {
            setUnreadNotifs(true);
          } else {
            console.log(result)
          }
      }
      if(counter < 2){
        getNotifications();
        setCounter(counter + 1);
      }
      console.log(unreadNotifs)
    })

    return (
<nav className='bg-secondaryColor'>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pb-2 ">
    <div className='flex flex-row my-auto' onClick={()=>{navigate("/")}} style={{cursor: "pointer"}}>
    <img src={logo} alt="match karao" className='w-24 h-24'/>
    <p className='text-3xl font-Changa mt-8 font-bold'>MatchKarao</p>
    </div>
        
    <button onClick={toggleNavbar} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    {currentUrl !== "/registerPage" ? <div className={`${!isOpen ? "hidden " : " "} w-full md:block md:w-auto`} id="navbar-default">
      <ul className="text-lg flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
        <li>
          <Link to="/dashboard">
          <div className="block py-2 px-3 text-black rounded  font-Changa font-bold md:p-0 hover:text-white" >Home</div>
          </Link>
        </li>
        <li>
        <Link to="/about">
          <div className="block py-2 px-3 text-black rounded  md:border-0 font-Changa font-bold md:p-0 hover:text-white ">About Us</div>
          </Link>
        </li>
        <li className='flex flex-row'>
        <Link to="/bookings" >
          <div className="block py-2 px-3 text-black rounded  md:border-0 font-Changa font-bold md:p-0 hover:text-white ">Bookings</div>
          </Link>
          {unreadNotifs ? <span className="inline-flex h-3 w-3 rounded-full bg-red-500"></span> : <></>}
        </li>
        <li>
          <a href="#" onClick={handleLogout} className="block py-2 px-3 text-black rounded  md:border-0 font-Changa font-bold md:p-0 hover:text-white ">Sign Out</a>
        </li>
      </ul>
    </div> : <></>}
    
  </div>
</nav>


    );
};

export default Navbar;
      
