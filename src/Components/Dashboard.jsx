import React, { useEffect, useState, useRef } from "react";
import SplashScreen from "./SplashScreen";
import { calendar, location, logo } from "../assets";
import Navbar from "./Navbar";
import "./splash.css"
import { ticketBackground } from "../assets";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function PlusButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => {
      navigate("/newBooking")
    }}
      className="fixed bottom-0 right-0 m-8 bg-secondaryColor hover:bg-loginKaDabba text-black text-2xl hover:text-white font-bold w-16 h-16 rounded-full shadow-md"
    >
      +
    </button>
  );
}

const Ticket = ({ teamOnePicture, teamTwoPicture, title, date, details, seat, ticketId }) => {
  return (
    <div className="relative inline-block m-4">
      <img src={ticketBackground} alt="Your Image" className="w-[380px] h-auto" />
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
            <img src={location} className="w-6 h-6" />
            <p className="ml-4 font-Changa font-bold text-lg text-ticketText ">YAHAN WAHAN</p>
          </div>
          <div className="ml-4 flex flex-row mt-2 items-center">
            <img src={calendar} className="w-6 h-6" />
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
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [leftSideHeight, setLeftSideHeight] = useState(1000);
  const initialRightSideHeightRef = useRef(0);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplash(false);
      // navigate('/your-destination-page'); // Navigate on timeout
    }, 3000); // Hide splash after 2 seconds (adjust as needed)

    return () => clearTimeout(timeoutId);
  })
  useEffect(() => {
    const handleScroll = () => {
      const height = initialRightSideHeightRef.current.offsetHeight;
      console.log("Div height:", height);
      setLeftSideHeight(leftSideHeight + height);
      
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (<>

    {showSplash && <div className={`splash-screen ${isHidden ? 'hidden' : ''}`}> <SplashScreen /></div>}
    <Navbar />
    {loading ? <LoadingScreen /> : (
      <>
        <div className="h-screen flex">
          <div className="w-2/5 bg-loginKaDabba flex flex-col items-center" style={{height: leftSideHeight}}>
          <h1 className="mt-4 font-Changa font-extrabold text-[50px] text-white">
              FINDER
            </h1>
            <div className="m-4 bg-primaryColor rounded-3xl">
            
              <div className="m-4">
              <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">LOCATION</label>
              <input value={location} onChange={(e) => { setLocation(e.target.value) }}
                className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="text" />
              </div>
              <div className="m-4">
              <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">DATE</label>
              <input value={date} onChange={(e) => { setDate(e.target.value) }}
                className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="date" />
              </div>
              <div className="m-4">
              <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">START TIME</label>
              <input value={startTime} onChange={(e) => { setStartTime(e.target.value) }}
                className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="time" />
              </div>
              <div className="m-4">
              <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">END TIME</label>
              <input value={endTime} onChange={(e) => { setEndTime(e.target.value) }}
                className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="time" />
              </div>
              <div className="m-4">
              <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">PRICE</label>
              <input value={price} onChange={(e) => { setPrice(e.target.value) }}
                className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="number" />
              </div>
            </div>
            <div className='flex justify-center'>
            <button
              onClick={()=>{navigate("/dashboard")}}
              style={{
                boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
              }}
              className={`mb-16 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-56`}
            >
              <h1 className="text-2xl font-bold">
                Search
              </h1>
            </button>
            </div>
          </div>
          <div className="w-3/5 bg-ticketBackground" id="balls" ref={initialRightSideHeightRef}>
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
            <Ticket title={"lol"} date={"lol"} details={"lol"} seat={"lol"} ticketId={"lol"} key={"lol"} />
          </div>
        </div>





      </>
    )}
    <PlusButton />
  </>)
}
export default Dashboard;