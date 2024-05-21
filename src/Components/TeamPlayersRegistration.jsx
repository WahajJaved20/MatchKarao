import React, { useEffect } from 'react';
import { logo, defaultAvatar } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from './LoadingScreen';
import Navbar from './Navbar';
import imageCompression from 'browser-image-compression';

function InputBox({ label, name, type, value, handleChange, isRequired, error, index }) {
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
          onChange={(e) => handleChange(e, index)}

          maxLength={30}
        />

      </div>
    </div>
  )
}
const defaultInformation = {
  playerName: "",
  // position: "",
  height: "",
  // weight: "",
  age: "",
  picture: "",
  // favoritePlayer: ""
}
const TeamPlayersRegistration = () => {
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const documentID = location.state?.documentID;
  const teamName = location.state?.teamName;
  const [playersInformation, setPlayerInformation] = React.useState([defaultInformation]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(documentID)
    console.log(location.state)
  }, [playersInformation])

  const handleInputChange = (event, index) => {
    console.log(index);
    setPlayerInformation((prevState) => {
      const updatedPlayersInformation = prevState.map((player, i) => 
        i === index ? { ...player, [event.target.name]: event.target.value } : player
      );
      return updatedPlayersInformation;
    });
    
  };
  async function changeImageSize(files) {
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
  const handleImageChange = async (e, index) => {
    const files = e.target.files;
    if (files.length > 1) {
      toast.error('Maximum 1 image allowed.');
      e.target.value = null;
      return;
    }
    const file = files[0];
    try {
      const resizedImage = await changeImageSize(file);
      const reader = new FileReader();
      reader.readAsDataURL(resizedImage);
      reader.onloadend = () => {
        const updatedPlayersInformation = [...playersInformation];
        updatedPlayersInformation[index].picture = reader.result;
        setPlayerInformation(updatedPlayersInformation);
        toast.success('Image loaded successfully.');
      };
    } catch (error) {
      console.error('Error loading image:', error);
      toast.error('An error occurred while loading the image.');
    }
  };
  const handleSubmit = async () => {
    for(var i=0;i<playersInformation.length;i++){
      for(var key in playersInformation[i]){
        if(key === "picture"){
          continue;
        }
        if(playersInformation[i][key].length === 0){
          toast.error('Please fill all the fields');
          return;
        }
      }
    }
    setLoading(true);
    const result = await fetch(`http://localhost:5000/addTeamMembers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({teamName:teamName, teamID: documentID, playersInformation: playersInformation}),
    }).then((resp) => resp.json());
    if (result.type === "Success") {
        console.log(result.message)
        localStorage.setItem('token', result.message);
        toast.success('Team Members Successfully Added');
        toast.info('Please Login Again');
        setLoading(false);
        navigate('/',);
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
              Enter Player Details
            </h1>
            {playersInformation.map((playerInfo, index) => (
              <>
                <h1 className={`font-Changa text-3xl font-bold mb-2`}>Player # {index + 1}: </h1>
                <h1 className={`font-Changa text-2xl font-bold mb-2`}>Upload Player Picture*</h1>
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " id="file_input" type="file" accept="image/*" onChange={(e) => {
                  handleImageChange(e, index)
                }
                }></input>
                <img class="mt-4 ml-[40%] w-[120px] h-[120px] rounded-full bg-secondaryColor" src={playersInformation[index].picture ? playersInformation[index].picture : defaultAvatar} alt="Rounded avatar" />
                <InputBox
                  label="Player Name"
                  name="playerName"
                  type="text"
                  value={playersInformation[index].playerName}
                  isRequired={true}
                  index={index}
                  // error={error.teamName}
                  handleChange={handleInputChange}
                />
                <InputBox
                  label="Player Height"
                  name="height"
                  type="text"
                  value={playersInformation[index].height}
                  isRequired={true}
                  index={index}
                  // error={error.teamName}
                  handleChange={handleInputChange}
                />
                <InputBox
                  label="Player Age"
                  name="age"
                  type="number"
                  value={playersInformation[index].age}
                  isRequired={true}
                  index={index}
                  // error={error.teamName}
                  handleChange={handleInputChange}
                />
              </>
            ))}
            <div className='flex flex-col md:flex-row justify-center'>
              <button
                onClick={() => {
                  setPlayerInformation([...playersInformation, defaultInformation]);
                }}
                // disabled={true}
                style={{
                  boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                }}
                className={`mb-16 px-4 mr-32 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-48`}
              >
                <h1 className="text-2xl font-bold">
                  Add a Player
                </h1>
              </button>
              <button
                onClick={() => {
                  if (playersInformation.length > 1) {
                    setPlayerInformation(playersInformation.slice(0, playersInformation.length - 1));
                  }
                }}
                // disabled={true}
                style={{
                  boxShadow: '8px 8px 0px rgba(0, 0, 0, 1)',
                }}
                className={`mb-16 px-4 border min-h-10 bg-secondaryColor text-black font-Changa lg:text-2xl text-md mt-8 w-56`}
              >
                <h1 className="text-2xl font-bold">
                  Remove a Player
                </h1>
              </button>
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
                  Done
                </h1>
              </button>
            </div>
          </div>
        </div>
      </>
    )}

  </>
  );
};

export default TeamPlayersRegistration;