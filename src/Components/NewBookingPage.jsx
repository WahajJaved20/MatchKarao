import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import LoadingBar from './LoadingScreen';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./SelectUI"
import constants from "../constants/locationPrice";

function InputBox({ label, name, type, value, handleChange, isRequired, error }) {
  let textColor = error ? "text-red-600" : "text-black"

  return (
    <div className="w-full">
      <div className="relative z-0 w-full mb-5 group">
        <div className="flex flew-row">
          <h1 className={`font-Changa text-2xl ${textColor} font-bold mb-2`}>{label}</h1>
          <span className={`${textColor} text-3xl font-Changa`}>{isRequired && ' *'}</span>
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className="focus:outline-none font-Changa font-bold"
          placeholder=" "
          style={{
            width: '100%',
            padding: '10px',
            border: 'none',
            borderBottom: '4px solid black',
            backgroundColor: "transparent",
            outline: 'none',
          }}
          required={isRequired}
          value={value}
          onChange={(e) => handleChange(e.target.value)}

          maxLength={30}
        />

      </div>
    </div>
  )
}

function RadioGroup({ options, onChange, value }) {
  return (
    <div className="flex flex-row space-x-32">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="radioGroup"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none rounded-full w-4 h-4 border-gray-300"
          />
          <h1 className={`font-Changa text-xl font-bold mb-2`}>{option.label}</h1>
        </label>
      ))}
    </div>
  );
}

const NewBookingPage = ({teamID}) => {
  const options = [
    { value: 'Full Booking', label: 'Full Booking' },
    { value: 'Half Booking', label: 'Half Booking' },
  ];
  const [selectedValue, setSelectedValue] = useState("Full Booking");
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState([])
  const [venue, setVenue] = useState("")
  const [venues, setVenues] = useState([])
  const [pricePerVenue, setPricePerVenue] = useState({})
  const [availableTimes, setAvailableTimes] = useState([])
  function listLocations() {
    const locs = constants["locationWithPrice"]
    var tempList = []
    for (var key in locs) {
      tempList.push(key)
    }
    setLocations(tempList);
  }
  function listAvailableTimes() {
    setAvailableTimes(constants["availableTimes"])
  }
  function listVenues(value) {
    const vens = constants["locationWithPrice"]
    const currLocVens = vens[value]
    setPricePerVenue(currLocVens)
    var venList = []
    for (var key in currLocVens) {
      venList.push(key)
    }
    console.log(venList)
    console.log(currLocVens)
    setVenues(venList)
  }
  useEffect(() => {
    if (locations.length == 0) {
      listLocations()
      listAvailableTimes()
    }
  })
  const handleSubmit = async () => {
    if (selectedValue.length === 0 || location.length === 0 || date.length === 0 || startTime.length === 0
      || endTime.length === 0
      || price == 0
    ) {
      toast.error('Please fill all the fields');
      return;
    }
    setLoading(true);
    const formData = {
      bookingType: selectedValue,
      location: location,
      date: date,
      startTime: startTime,
      endTime: endTime,
      price: price,
      teamID: localStorage.getItem("teamID")
    }
    console.log(formData)
    const result = await fetch(`https://match-karao-backend.vercel.app/createNewBooking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then((resp) => resp.json());
    if (result.type === "Success") {
        console.log(result.message)
        toast.success('Booking Successfully Created');
        setLoading(false);
        // navigate('/teamPlayerRegistration', { state: { documentID: result.docID, teamName: teamName } });
    } else {
        console.log(result)
        setLoading(false);
        toast.error(result.message);
    }
  }
  return (
    <>
      {loading ? <LoadingBar /> : <><Navbar />
        <div className='flex flex-col items-center relative'>
          <div className="flex flex-col justify-content-center">
            <h1 className="mt-16 font-Changa font-extrabold text-[30px] md:text-[50px] lg:text-[80px] sm:mb-8 md:mb-8">
              Enter Booking Details
            </h1>
            <h1 className={`font-Changa text-3xl font-bold mb-2`}>Select Type of Booking</h1>
            <RadioGroup options={options} onChange={setSelectedValue} value={selectedValue} />
            <h1 className={`font-Changa text-2xl text-black font-bold mb-2`}>{"LOCATION"}</h1>
            <div className="outline-none mb-4 w-[100%] border-4 border-black relative font-Gotham">
              <Select

                className="bg-white text-black p-10 w-[100%] outline-none"
                onValueChange={(value) => {
                  setLocation(value);
                  listVenues(value);
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
            <h1 className={`font-Changa text-2xl text-black font-bold mb-2`}>{"AVAILABLE VENUES"}</h1>
            <div className="outline-none mb-4 w-[100%] border-4 border-black relative font-Gotham">
              <Select

                className="bg-white text-black p-10 w-[100%] outline-none"
                onValueChange={(value) => {
                  setVenue(value);
                  setPrice(pricePerVenue[value][selectedValue])
                }
                }
              >
                <SelectTrigger
                  aria-label="Social Media Activity"
                  className="bg-white text-black focus:ring-0"
                >
                  <SelectValue
                    placeholder="Select Venue"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent className="bg-loginKaDabba font-circularStd text-white border-0 focus:ring-0">
                  <SelectGroup>
                    <SelectLabel>Select Venue</SelectLabel>
                    {venues.map((ven) => {

                      return (
                        <SelectItem
                          value={ven}
                          className="hover:bg-slate-900 b-2"
                        >
                          {ven}
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
            <div className="flex flex-row">
              <h1 className={`font-Changa text-2xl text-black font-bold mb-2`}>{"PRICE:"}</h1>
              <h1 className={`font-Changa text-2xl text-black font-bold mb-2 ml-8`}>{venue !== "" && selectedValue !== "" ? pricePerVenue[venue][selectedValue] : "0"}</h1>
            </div>

            <InputBox
              label="Date"
              name="Date"
              type="date"
              value={date}
              isRequired={true}
              // error={error.teamName}
              handleChange={setDate}
            />
            <h1 className={`font-Changa text-2xl text-black font-bold mb-2`}>{"AVAILABLE TIME:"}</h1>

            <div className="outline-none mb-4 w-[100%] border-4 border-black relative font-Gotham">
              <Select

                className="bg-white text-black p-10 w-[100%] outline-none"
                onValueChange={(value) => {
                  setStartTime(value["startTime"])
                  setEndTime(value["endTime"])
                }
                }
              >
                <SelectTrigger
                  aria-label="Social Media Activity"
                  className="bg-white text-black focus:ring-0"
                >
                  <SelectValue
                    placeholder="Select Availaible Time"
                    className="text-black"
                  />
                </SelectTrigger>
                <SelectContent className="bg-loginKaDabba font-circularStd text-white border-0 focus:ring-0">
                  <SelectGroup>
                    <SelectLabel>Select Availaible Time</SelectLabel>
                    {availableTimes.map((ven) => {

                      return (
                        <SelectItem
                          value={ven}
                          className="hover:bg-slate-900 b-2"
                        >
                          {ven["startTime"]}-{ven["endTime"]}
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

            <div className='flex justify-center'>
              <button
                onClick={handleSubmit}
                style={{
                  boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                }}
                className={`mb-16 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-56`}
              >
                <h1 className="text-2xl font-bold">
                  Add Your Booking
                </h1>
              </button>
            </div>
          </div>
        </div></>}

    </>
  );
}
export default NewBookingPage;