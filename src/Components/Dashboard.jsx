import React, { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import Navbar from "./Navbar";
import "./splash.css"
import { ticketBackground } from "../assets";
const Ticket = ({ title, date, details, seat, ticketId }) => {
    return (
      <div>
        <img src={ticketBackground}/>
      </div>
    );
  };
const Dashboard = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            setShowSplash(false);
            // navigate('/your-destination-page'); // Navigate on timeout
          }, 3000); // Hide splash after 2 seconds (adjust as needed)
      
          return () => clearTimeout(timeoutId);
    })
    return (<>
    
    {showSplash &&<div className={`splash-screen ${isHidden ? 'hidden' : ''}`}> <SplashScreen /></div> }
    <Navbar />
    <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"}/>
    lol
    </>)
}
export default Dashboard;