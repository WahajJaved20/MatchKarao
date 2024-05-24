import React, { useEffect, useState, useRef } from "react";
import SplashScreen from "./SplashScreen";
import { calendar, defaultAvatar, location, logo } from "../assets";
import Navbar from "./Navbar";
import "./splash.css"
import { ticketBackground } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import constants from "../constants/locationPrice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./SelectUI"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlusButton({ teamID }) {
	const navigate = useNavigate();
	return (
		<button onClick={() => {
			navigate("/newBooking", { state: { teamID: teamID } })
		}}
			className="fixed bottom-0 right-0 m-8 bg-secondaryColor hover:bg-loginKaDabba text-black text-2xl hover:text-white font-bold w-16 h-16 rounded-full shadow-md"
		>
			+
		</button>
	);
}

const Ticket = ({ halfBooking, key, helper, setLoading }) => {
	async function AskToPlay() {
		setLoading(true)
		const result = await fetch(`https://match-karao-backend.vercel.app/askToPlay`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				teamOneID: halfBooking.teamID,
				teamTwoID: localStorage.getItem("teamID"),
				venue: halfBooking.venue,
				price: halfBooking.price,
				date: halfBooking.date,
				location: halfBooking.location,
				startTime: halfBooking.startTime,
				endTime: halfBooking.endTime,
				ticketID: halfBooking._id
			})
		}).then((resp) => resp.json());
		console.log(result)
		if (result.type === "Success") {
			await helper();
			toast.success("Booking Successful")
			setLoading(false);
		} else {
			console.log(result)
			setLoading(false);
			toast.error(result.message);
		}
	}
	return (
		<div key={key} className="relative inline-block m-4">
			<img src={ticketBackground} alt="Your Image" className="w-[380px] h-auto" />
			<div className="absolute inset-0 flex items-center justify-center  text-white mx-8">
				<div className="flex flex-col">
					<div className="flex flex-row justify-between gap-4 items-center">
						<div className="flex flex-row items-center">
							<img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={halfBooking.image} alt="Rounded avatar" />
							<p className="ml-2 font-Changa font-bold text-ticketText text-xl">{halfBooking.teamName}</p>

						</div>
						<p className="font-Changa font-bold text-2xl text-ticketText ">VS</p>
						<div className="flex flex-row items-center">
							<img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={defaultAvatar} alt="Rounded avatar" />
							<p className="ml-2 font-Changa font-bold text-xl text-ticketText ">TBD</p>

						</div>

					</div>
					<div className="ml-4 flex flex-row mt-2 items-center">
						<img src={location} className="w-6 h-6" />
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.location}</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">|</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">Rs. {halfBooking.price}</p>
					</div>
					<div className="ml-4 flex flex-row mt-2 items-center">
						<img src={calendar} className="w-6 h-6" />
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.venue ? halfBooking.venue : "idhar"}</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">|</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.startTime} - {halfBooking.endTime}</p>
					</div>
					<button
						onClick={AskToPlay}
						className={`px-2 border-2 border-black min-h-6  text-black font-Changa text-sm mt-2 w-full hover:bg-loginKaDabba hover:text-white`}
					>
						<h1 className="text-lg font-extrabold text-ticketText hover:text-white">
							Ask To Play
						</h1>
					</button>
				</div>
			</div>
		</div>
	);
};

const Dashboard = () => {
	const curr = useLocation();
	const teamID = curr.state?.teamID;
	const [showSplash, setShowSplash] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [loading, setLoading] = useState(false)
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	// const [price, setPrice] = useState("");
	const [leftSideHeight, setLeftSideHeight] = useState(1000);
	const initialRightSideHeightRef = useRef(0);
	const [halfBookings, setHalfBookings] = useState(null)
	const [locations, setLocations] = useState([]);
	function listLocations() {
		const locs = constants["locationWithPrice"]
		var tempList = []
		for (var key in locs) {
			tempList.push(key)
		}
		setLocations(tempList);
	}
	// useEffect(() => {
	//   console.log(teamID)
	//   const timeoutId = setTimeout(() => {
	//     setShowSplash(false);
	//     // navigate('/your-destination-page'); // Navigate on timeout
	//   }, 3000); // Hide splash after 2 seconds (adjust as needed)

	//   return () => clearTimeout(timeoutId);
	// })
	// useEffect(() => {
	//   const handleScroll = () => {
	//     const height = initialRightSideHeightRef.current.offsetHeight;
	//     console.log("Div height:", height);
	//     setLeftSideHeight(leftSideHeight + height);

	//   };
	//   window.addEventListener('scroll', handleScroll);

	//   return () => window.removeEventListener('scroll', handleScroll);
	// }, []);
	async function getHalfBooking() {
		const result = await fetch(`https://match-karao-backend.vercel.app/getHalfBookings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((resp) => resp.json());
		if (result.type === "Success") {
			setHalfBookings(result.result);
			setLoading(false);
		} else {
			console.log(result)
			setLoading(false);
			toast.error(result.message);
		}
	}
	useEffect(() => {
		
		if (halfBookings == null) {
			setLoading(true);
			getHalfBooking();
		}
		listLocations();
	}, [halfBookings])
	async function filterBookings() {
		setLoading(true)
		const result = await fetch(`https://match-karao-backend.vercel.app/filterBookings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				location: location,
				date: date,
				startTime: startTime,
				endTime: endTime
			})
		}).then((resp) => resp.json());
		console.log(result)
		if (result.type === "Success") {
			setHalfBookings(result.results);
			toast.success("Cleared All Filters")
			setLoading(false);
		} else {
			console.log(result)
			setLoading(false);
			toast.error(result.message);
		}
	}
	return (<>

		{showSplash && <div className={`splash-screen ${isHidden ? 'hidden' : ''}`}> <SplashScreen /></div>}
		<Navbar />
		{loading ? <LoadingScreen /> : (
			<>
				<div className="h-screen flex">
					<div className="w-2/5 bg-loginKaDabba flex flex-col items-center" style={{ height: leftSideHeight }}>
						<h1 className="mt-4 font-Changa font-extrabold text-[50px] text-white">
							FINDER
						</h1>
						<div className="m-4 bg-primaryColor rounded-3xl">

							<div className="m-4">
								<label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">LOCATION</label>
								<div className="outline-none mb-4 w-[100%] border-4 border-black relative font-Gotham">
									<Select

										className="bg-white text-black p-10 w-[100%] outline-none"
										onValueChange={(value) => {
											setLocation(value);
										}
										}
									>
										<SelectTrigger
											aria-label="Social Media Activity"
											className="bg-white text-black focus:ring-0"
										>
											<SelectValue
												placeholder="Select Location"
												className="text-black"
											/>
										</SelectTrigger>
										<SelectContent className="bg-loginKaDabba font-circularStd text-white border-0 focus:ring-0">
											<SelectGroup>
												<SelectLabel>Select Location</SelectLabel>
												{locations.map((loc) => {

													return (
														<SelectItem
															value={loc}
															className="hover:bg-slate-900 b-2"
														>
															{loc}
														</SelectItem>
													)
												})}
											</SelectGroup>
										</SelectContent>
									</Select>
									<div className="absolute inset-y-0 end-1 right-2 top-1 flex items-center pointer-events-none">
										<svg
											width="20"
											height="20"
											viewBox="0 0 41 35"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M20.4485 34.7642L40.0663 0.785213H0.830776L20.4485 34.7642Z"
												fill="black"
											/>
										</svg>
									</div>
								</div>
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
							{/* <div className="m-4">
                <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">PRICE</label>
                <input value={price} onChange={(e) => { setPrice(e.target.value) }}
                  className="border-4 border-rounded-400 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="number" />
              </div> */}
						</div>
						<div className='flex justify-center flex-col'>
							<button
								onClick={async () => {
									await filterBookings();
								}}
								style={{
									boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
								}}
								className={`mb-4 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-56`}
							>
								<h1 className="text-2xl font-bold">
									Search
								</h1>
							</button>
							<button
								onClick={async () => {
									setLocation("");
									setDate("");
									setStartTime("");
									setEndTime("");
									await filterBookings();
								}}
								style={{
									boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
								}}
								className={`mb-16 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-56`}
							>
								<h1 className="text-2xl font-bold">
									Clear Filters
								</h1>
							</button>
						</div>
					</div>
					<div className="w-3/5 bg-ticketBackground" id="balls" ref={initialRightSideHeightRef}>
						{halfBookings ? halfBookings.map((halfBooking, index) => {
							return <Ticket halfBooking={halfBooking} key={index} helper={getHalfBooking} setLoading={setLoading}/>
						}) : <div></div>}
					</div>
				</div>
			</>
		)}
		<PlusButton teamID={teamID} />
	</>)
}
export default Dashboard;