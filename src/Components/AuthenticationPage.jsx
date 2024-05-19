import React, { useEffect } from 'react';
import { logo } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from './LoadingScreen';

const AuthenticationPage = () => {
    const [teamName, setTeamName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
      useEffect(() => {
        const getUser = async () => {
          const response = await fetch("https://match-karao-backend.vercel.app/verifyJWT", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ jwtToken: localStorage.getItem('token') }),
          });
          const data = await response.json();
          if(data.type === "Failed"){

          }else{
              toast.info("Already Logged In");
              navigate("/dashboard");
          }
      }
      if(localStorage.getItem('token')){
        getUser()
      }
      }, [])
      const handleSubmit = async () => {
        if(teamName.length === 0 || password.length === 0){
          toast.error('Please fill all the fields');
          return;
        }
        setLoading(true);
          const result = await fetch(`https://match-karao-backend.vercel.app/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    teamName: teamName,
                    password: password
                }),
            }).then((resp) => resp.json());
            if(result.type === "Success"){
              console.log(result.message)
              localStorage.setItem('token', result.message);
              toast.success('Login Successful');
              setLoading(false);
              navigate('/dashboard');
            }else{
              console.log(result)
              setLoading(false);
              toast.error(result.message);
            }
        }
    return (<>
        {loading ? <LoadingBar /> : (
            <>
                <div className="flex flex-col md:flex-row lg:flex-row h-screen">
                    <div className={` flex-1 bg-secondaryColor flex-col flex items-center justify-center p-16`}>
                        <img src={logo} alt="Logo" className="w-[75%]" />
                        <p className='text-[80px] font-Changa'>MatchKarao</p>
                    </div>

                    <div className="flex-1 bg-primaryColor flex flex-col items-center justify-center p-8">
                        <div className="bg-tertiaryColor flex flex-col md:flex-row rounded-3xl w-full max-w-lg border-4 border-solid border-black p-2 mb-4">
                            <button
                                className={`flex-1 mb-2 text-xl font-Changa font-bold border-black rounded-full 
        mb-2 md:mb-0 md:mr-2 bg-loginKaDabba text-white border-4`}
                                >
                                LOGIN
                            </button>
                            <button
                                className={`flex-1 text-xl font-Changa font-bold border-black 
        rounded-full md:ml-2 text-black bg-tertiaryColor`}
                                onClick={()=>{
                                    setLoading(true);
                                    navigate("/registerPage")
                                }}>
                                REGISTER
                            </button>
                        </div>
                        <div className="hidden md:block lg:block bg-white rounded-3xl w-full max-w-lg border-4 border-solid border-black h-[70%] p-8">
                            <div className='mt-8' />
                            <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-4">TEAM NAME</label>
                            <input value={teamName} onChange={(e) => { setTeamName(e.target.value) }}
                                className="border-b-4 font-bold text-xl border-black focus:outline-none mt-4 font-Changa w-full mb-4" type="text" />

                            <div className='mt-8' />
                            <label className="text-2xl md:text-3xl lg:text-3xl font-bold font-Changa mb-2 mt-4">PASSWORD</label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="border-b-4 font-bold text-lg border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="password" />
                            <div className='mt-8' />
                            <button onClick={handleSubmit}
                                className="bg-white text-2xl font-Changa text-black border-4 border-black rounded-full h-[12%] mt-4 font-bold ml-[70%] w-[30%]">
                                {"LOGIN"}
                            </button>
                        </div>

                        <div className="block md:hidden lg:hidden bg-white rounded-3xl w-full max-w-lg border-4 border-solid border-black p-8 mt-4">
                            <label className="text-2xl font-bold font-Changa mb-4">TEAM NAME</label>
                            <input value={teamName} onChange={(e) => { setTeamName(e.target.value) }}
                                className="border-b-4 font-bold text-xl border-black focus:outline-none mt-4 font-Changa w-full mb-4" type="text" />

                            <label className="text-2xl font-bold font-Changa mb-2 mt-4">PASSWORD</label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="border-b-4 font-bold text-xl border-black focus:outline-none font-Changa w-full mb-4 mt-4" type="password" />

                            <button onClick={handleSubmit}
                                className="bg-white text-xl font-Changa text-black border-4 border-black rounded-full h-[14%] mt-4 ml-[60%] font-bold w-[50%]">
                                {"LOGIN"}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )}

    </>
    );
};

export default AuthenticationPage;