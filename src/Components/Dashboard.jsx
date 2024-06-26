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
	const personalTeamID = localStorage.getItem("teamID");
	async function deleteBooking(){
		setLoading(true)
		const result = await fetch(`https://match-karao-backend.vercel.app/deleteBooking`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				bookingType: halfBooking.bookingType,
				ticketID: halfBooking._id
			})
		}).then((resp) => resp.json());
		if (result.type === "Success") {
			await helper();
			toast.success("Booking Deleted")
			setLoading(false);
		} else {
			setLoading(false);
			toast.error(result.message);
		}
	}
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
		if (result.type === "Success") {
			await helper();
			toast.success("Request Sent")
			setLoading(false);
		} else {
			setLoading(false);
			toast.error(result.message);
		}
	}
	return (
		<div key={key} className="relative inline-block m-4">
			<img src={ticketBackground} alt="Your Image" className="w-[380px] h-[220px]" />
			<div className="absolute inset-0 flex items-center justify-center text-white mx-8">
				<div className="flex flex-col">
					<div className="flex flex-row justify-between gap-4 items-center">
						<div className="flex flex-row items-center">
							<img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={halfBooking.image} alt="Rounded avatar" />
							<p className="ml-2 font-Changa font-bold text-ticketText text-xl">{halfBooking.teamName}</p>

						</div>
						{halfBooking.bookingType === "Half Booking" ? <><p className="font-Changa font-bold text-2xl text-ticketText ">VS</p>
							<div className="flex flex-row items-center">
								<img class="w-[60px] h-[60px] rounded-full bg-secondaryColor" src={halfBooking.teamTwoImage ? halfBooking.teamTwoImage : defaultAvatar} alt="Rounded avatar" />
								<p className="ml-2 font-Changa font-bold text-xl text-ticketText ">{halfBooking.teamTwoName ? halfBooking.teamTwoName : "TBD"}</p>

							</div></> : <></>}


					</div>
					<div className="ml-4 flex flex-row mt-2 items-center">
						<img src={location} className="w-6 h-6" />
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.venue}</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">|</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">Rs. {halfBooking.price}</p>
					</div>
					<div className="ml-4 flex flex-row mt-2 items-center">
						<img src={calendar} className="w-6 h-6" />
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.date}</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">|</p>
						<p className="ml-4 font-Changa font-bold text-lg text-ticketText ">{halfBooking.startTime} - {halfBooking.endTime}</p>
					</div>
					<div className="flex flex-row">
						{halfBooking.teamID !== personalTeamID ? <button
							onClick={AskToPlay}
							disabled={halfBooking.teamTwoID || halfBooking.bookingType === "Full Booking" || halfBooking.teamID === personalTeamID}
							className={`px-2 mr-2 border-2 border-black min-h-6  text-black font-Changa text-sm mt-2 w-full hover:bg-loginKaDabba hover:text-white`}
						>
							<h1 className="text-lg font-extrabold text-ticketText hover:text-white">
								{halfBooking.teamTwoID ? "BOOKED!" : halfBooking.bookingType === "Full Booking" ? "Fully Booked" : "Ask To Play"}
							</h1>
						</button>
							: <></>}

						{!halfBooking.teamTwoID && halfBooking.teamID === personalTeamID ?
							<button
								onClick={deleteBooking}
								className={`px-2 border-2 border-black min-h-6  text-black font-Changa text-sm mt-2 w-full hover:bg-red-400 hover:text-white`}
							>
								<h1 className="text-lg font-extrabold text-ticketText hover:text-white">
									{"Cancel Booking"}
								</h1>
							</button> : <></>}

					</div>
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
	const [confirmedHalfBooking, setConfirmedHalfBooking] = useState(null)
	const [unconfirmedHalfBookings, setUnconfirmedHalfBookings] = useState(null)
	const [fullBookings, setFullBookings] = useState(null)
	const [locations, setLocations] = useState([]);
	function listLocations() {
		const locs = constants["locationWithPrice"]
		var tempList = []
		for (var key in locs) {
			tempList.push(key)
		}
		setLocations(tempList);
	}
	async function getHalfBooking() {
		const result = await fetch(`https://match-karao-backend.vercel.app/getHalfBookings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((resp) => resp.json());
		if (result.type === "Success") {
			shortlistHalfBookings(result.result);
			setLoading(false);
		} else {
			setLoading(false);
			toast.error(result.message);
		}
		const result2 = await fetch(`https://match-karao-backend.vercel.app/getFullBookings`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((resp) => resp.json());
		if (result2.type === "Success") {
			shortlistFullfBookings(result2.result);
			setLoading(false);
		} else {
			setLoading(false);
			toast.error(result2.message);
		}
	}
	useEffect(() => {
		if (confirmedHalfBooking == null && unconfirmedHalfBookings == null) {
			setLoading(true);
			getHalfBooking();
		}
		listLocations();
	}, [confirmedHalfBooking, unconfirmedHalfBookings, fullBookings])
	function shortlistHalfBookings(halfBookings) {
		var confirmed = []
		var unconfirmed = []
		const teamID = localStorage.getItem("teamID");
		for (var i = 0; i < halfBookings.length; i++) {
			if (halfBookings[i].bookingConfirmation === "true" && (halfBookings[i].teamID == teamID || halfBookings[i].teamTwoID == teamID)) {
				confirmed.push(halfBookings[i])
			} else if (halfBookings[i].bookingConfirmation === "false") {
				unconfirmed.push(halfBookings[i])
			}
		}
		setConfirmedHalfBooking(confirmed);
		setUnconfirmedHalfBookings(unconfirmed);
	}
	function shortlistFullfBookings(halfBookings) {
		var bookings = []
		const teamID = localStorage.getItem("teamID");
		for (var i = 0; i < halfBookings.length; i++) {
			if (halfBookings[i].teamID == teamID) {
				bookings.push(halfBookings[i])
			}
		}
		setFullBookings(bookings);
	}
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
		if (result.type === "Success") {
			shortlistHalfBookings(result.results);
			setLoading(false);
		} else {
			setLoading(false);
			toast.error(result.message);
		}
	}
	return (<>

		{showSplash && <div className={`splash-screen ${isHidden ? 'hidden' : ''}`}> <SplashScreen /></div>}
		<Navbar />
		{loading ? <LoadingScreen /> : (
			<>
				<div className="h-screen flex flex-col lg:flex-row">
					<div className="w-full lg:w-2/5 bg-loginKaDabba flex flex-col items-center" style={{ height: leftSideHeight }}>
						<h1 className="mt-4 font-Changa font-extrabold text-[50px] text-white">
							FINDER
						</h1>
						<div className="m-4 bg-primaryColor rounded-3xl flex flex-row lg:flex-col flex-wrap">

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

						<div className="m-4 flex flex-col flex-wrap">
							<label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">CONFIRMED BOOKINGS</label>
							<div className="flex flex-row flex-wrap">
								{fullBookings ? fullBookings.map((fullBooking, index) => {
									return <Ticket halfBooking={fullBooking} key={index} helper={getHalfBooking} setLoading={setLoading} />
								}) : <div></div>}
								{confirmedHalfBooking ? confirmedHalfBooking.map((halfBooking, index) => {
									return <Ticket halfBooking={halfBooking} key={index} helper={getHalfBooking} setLoading={setLoading} />
								}) : <div></div>}

							</div>
						</div>
						<div className="m-4 flex flex-col flex-wrap">
							<label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-8">HALF BOOKINGS</label>
							<div className="flex flex-row flex-wrap">
								{unconfirmedHalfBookings ? unconfirmedHalfBookings.map((halfBooking, index) => {
									return <Ticket halfBooking={halfBooking} key={index} helper={getHalfBooking} setLoading={setLoading} />
								}) : <div></div>}
							</div>
						</div>
					</div>
				</div>
			</>
		)}
		<PlusButton teamID={teamID} />
	</>)
}
export default Dashboard;