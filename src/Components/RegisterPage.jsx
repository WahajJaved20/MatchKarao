import React, { useEffect } from 'react';
import { logo } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from './LoadingScreen';
import Navbar from './Navbar';


function InputBox ({ label, name, type, value, handleChange, isRequired, error}) {
    let textColor = error ? "text-red-600" : "text-black"

    return (
        <div className="w-full">
            <div className="relative z-0 w-full mb-5 group">
            <div className="flex flew-row">
            <h1 className={`font-Changa text-2xl ${textColor} font-bold mb-2`}>{label}</h1>
            <span className={`${textColor} text-2xl font-Changa`}>{isRequired && ' *'}</span>
            </div>
                <input
                    type={type}
                    name={name}
                    id={name}
                    className="focus:outline-none font-Changa"
                    placeholder=" "
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderBottom: '4px solid black',
                        backgroundColor:"transparent",
                        outline: 'none',
                    }}
                    required={isRequired}
                    value={value}
                    // onChange={(e) => handleChange(name, e.target.value)}
                    
                    maxLength={30}
                />
                
            </div>
        </div>
    )
}

const RegisterPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [teamName, setTeamName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [location, setLocation] = React.useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        
    },[])
    return (<>
        {loading ? <LoadingBar /> : (
            <>
            <Navbar />
            <div className='flex flex-col items-center'>
                <div className="flex flex-col justify-content-center">
                    <h1 className="mt-16 font-Changa font-extrabold text-[30px] md:text-[50px] lg:text-[80px] sm:mb-8 md:mb-8">
                        Enter Your Team Details
                    </h1>
                    <div className="flex flex-col gap-5 w-[270px] sm:w-[350px] md:w-[400px] lg:w-[65%] mx-auto">
                    <h1 className={`font-Changa text-2xl font-bold mb-2`}>Upload Team Logo*</h1>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="file_input" type="file"></input>
                    <img class="ml-[40%] w-[120px] h-[120px] rounded-full bg-secondaryColor" src={logo} alt="Rounded avatar" />
                    <InputBox
                        label="TEAM NAME"
                        name="teamName"
                        type="text"
                        value={teamName}
                        isRequired={true}
                        // error={error.teamName}
                        // handleChange={handleInput}
                    />
                    <InputBox
                        label="PASSWORD"
                        name="password"
                        type="password"
                        value={password}
                        isRequired={true}
                        // error={error.teamName}
                        // handleChange={handleInput}
                    />
                    <InputBox
                        label="CONFIRM PASSWORD"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        isRequired={true}
                        // error={error.teamName}
                        // handleChange={handleInput}
                    />
                    <InputBox
                        label="LOCATION"
                        name="location"
                        type="text"
                        value={location}
                        isRequired={true}
                        // error={error.teamName}
                        // handleChange={handleInput}
                    />
                    <div className='flex flex-row justify-center'>
                    <button
                        onClick={()=>{navigate("/teamPlayerRegistration")}}
                        // disabled={true}
                        style={{
                            boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                        }}
                        className={`mb-16 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-48`}
                    >
                        <h1 className="text-2xl font-bold">
                            Next
                        </h1>
                    </button>
                    </div>
                    </div>
                </div>
            </div>
            </>
        )}

    </>
    );
};

export default RegisterPage;