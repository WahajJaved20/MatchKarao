import React, { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { calendar, location, logo } from "../assets";
import Navbar from "./Navbar";
import "./splash.css"
import { ticketBackground } from "../assets";
const Ticket = ({ teamOnePicture, teamTwoPicture, title, date, details, seat, ticketId }) => {
    return (
      <div className="relative inline-block m-8">
      <img src={ticketBackground} alt="Your Image" className="w-[400px] h-auto" />
      <div className="absolute inset-0 flex items-center justify-center  text-white mx-8">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between gap-4 items-center">
            <div className="flex flex-row items-center">
            <img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={logo} alt="Rounded avatar" />
            <p className="ml-2 font-Changa font-bold text-ticketText text-xl">TITANS</p>
          
            </div>
          <p className="font-Changa font-bold text-2xl text-ticketText ">VS</p>
          <div className="flex flex-row items-center">
            <img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={logo} alt="Rounded avatar" />
            <p className="ml-2 font-Changa font-bold text-xl text-ticketText ">ITTEHAD</p>
          
            </div>

          </div>
          <div className="ml-4 flex flex-row mt-2 items-center">
            <img src={location} className="w-6 h-6"/>
            <p className="ml-4 font-Changa font-bold text-lg text-ticketText ">YAHAN WAHAN</p>
          </div>
          <div className="ml-4 flex flex-row mt-2 items-center">
            <img src={calendar} className="w-6 h-6"/>
            <p className="ml-4 font-Changa font-bold text-lg text-ticketText ">FRIDAY</p>
            <p className="ml-4 font-Changa font-bold text-lg text-ticketText ">|</p>
            <p className="ml-4 font-Changa font-bold text-lg text-ticketText ">6:00 - 8:00</p>
          </div>
          <button
                        
                        className={`px-2 border-2 border-black min-h-6  text-black font-Changa text-sm mt-2 w-full`}
                    >
                        <h1 className="text-lg font-extrabold text-ticketText">
                            Ask To Play
                        </h1>
                    </button>
        </div>
      </div>
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
    </>)
}
export default Dashboard;