import React, { useEffect } from 'react';
import { defaultAvatar, logo } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from './LoadingScreen';
import Navbar from './Navbar';
import imageCompression from 'browser-image-compression';

function InputBox({ label, name, type, value, handleChange, isRequired, error }) {
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
                        backgroundColor: "transparent",
                        outline: 'none',
                    }}
                    required={isRequired}
                    value={value}
                    onChange={handleChange}
                    maxLength={30}
                />

            </div>
        </div>
    )
}

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [teamName, setTeamName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [formData, setFormData] = React.useState({
        date: new Date().toLocaleDateString(),
      });
      const handleInputChange = (event) => {
        if (event.target.name === 'teamName') {
          setTeamName(event.target.value);
        } else if (event.target.name === 'password') {
          setPassword(event.target.value);
        } else if (event.target.name === 'confirmPassword') {
            setConfirmPassword(event.target.value);
        } else if (event.target.name === 'location') {
            setLocation(event.target.value);
        }
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
      async function changeImageSize(files){
        try {
          const options = {
            maxSizeMB: 0.01, 
            maxWidthOrHeight: 400, 
          };
          const compressedFile = await imageCompression(files, options);
          return compressedFile
        } catch (error) {
          console.error('Image compression failed:', error);
        }
      }
    const handleImageChange = async (e) => {
        let files = e.target.files;
        console.log(files)
        if (files.length <= 1) {
        files = await changeImageSize(files[0])
        console.log(files)
          var reader = new FileReader();
          reader.readAsDataURL(files);
          
          reader.onloadend = (e) => {
            
            setImage([reader.result]);
            setFormData({ ...formData, image: reader.result });
          };
          toast.success('Image loaded successfully.');
        } else {
          toast.error('Maximum 1 image allowed.');
          e.target.value = null;
          setImage([]);
        }
      };
    const handleSubmit = async () => {
        if (teamName.length === 0 || password.length === 0 || confirmPassword.length === 0 || location.length === 0 || image == null) {
            toast.error('Please fill all the fields');
            return;
        }
        if(password !== confirmPassword){
            toast.error("The Passwords are not same");
            return;
        }
        setLoading(true);
        const result = await fetch(`http://localhost:5000/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((resp) => resp.json());
        if (result.type === "Success") {
            console.log(result.message)
            localStorage.setItem('token', result.message);
            toast.success('Login Successful');
            setLoading(false);
            navigate('/teamPlayerRegistration', {state: {documentID: result.docID}});
        } else {
            console.log(result)
            setLoading(false);
            toast.error(result.message);
        }
    }
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
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="file_input" type="file" accept="image/*" onChange={handleImageChange}></input>
                            <img class="ml-[40%] w-[120px] h-[120px] rounded-full bg-secondaryColor" src={image ? image : defaultAvatar} alt="Rounded avatar" />
                            <InputBox
                                label="TEAM NAME"
                                name="teamName"
                                type="text"
                                value={teamName}
                                isRequired={true}
                            // error={error.teamName}
                            handleChange={handleInputChange}
                            />
                            <InputBox
                                label="PASSWORD"
                                name="password"
                                type="password"
                                value={password}
                                isRequired={true}
                            // error={error.teamName}
                            handleChange={handleInputChange}
                            />
                            <InputBox
                                label="CONFIRM PASSWORD"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                isRequired={true}
                            // error={error.teamName}
                            handleChange={handleInputChange}
                            />
                            <InputBox
                                label="LOCATION"
                                name="location"
                                type="text"
                                value={location}
                                isRequired={true}
                            // error={error.teamName}
                            handleChange={handleInputChange}
                            />
                            <div className='flex flex-row justify-center'>
                                <button
                                    onClick={handleSubmit}
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