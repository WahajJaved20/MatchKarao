import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";

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

const NewBookingPage = () => {
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



      
    return(
        <>
        <Navbar />
        <div className='flex flex-col items-center'>
          <div className="flex flex-col justify-content-center">
            <h1 className="mt-16 font-Changa font-extrabold text-[30px] md:text-[50px] lg:text-[80px] sm:mb-8 md:mb-8">
              Enter Booking Details
            </h1>
            <h1 className={`font-Changa text-3xl font-bold mb-2`}>Select Type of Booking</h1>
            <RadioGroup options={options} onChange={setSelectedValue} value={selectedValue} />
            <InputBox
                label="Location"
                name="location"
                type="text"
                value={location}
                isRequired={true}
                // error={error.teamName}
                handleChange={setLocation}
            />
            <InputBox
                label="Date"
                name="Date"
                type="date"
                value={date}
                isRequired={true}
                // error={error.teamName}
                handleChange={setDate}
            />
            <InputBox
                label="Start Time"
                name="Start Time"
                type="time"
                value={startTime}
                isRequired={true}
                // error={error.teamName}
                handleChange={setStartTime}
            />
            <InputBox
                label="End Time"
                name="End Time"
                type="time"
                value={endTime}
                isRequired={true}
                // error={error.teamName}
                handleChange={setEndTime}
            />
            <InputBox
                label="Price"
                name="Price"
                type="number"
                value={price}
                isRequired={true}
                // error={error.teamName}
                handleChange={setPrice}
            />
            <div className='flex justify-center'>
            <button
              // onClick={()=>{navigate("/dashboard")}}
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
            </div>
        </>
    );
}
export default NewBookingPage;