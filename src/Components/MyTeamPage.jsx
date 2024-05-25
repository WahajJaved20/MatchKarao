import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LoadingScreen from "./LoadingScreen";
import { defaultAvatar } from "../assets";
function TeamPage() {
    const [teamData, setTeamData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getTeamData() {
        setLoading(true)
        const id = localStorage.getItem("teamID")
        const result = await fetch(`https://match-karao-backend.vercel.app/getTeamMembers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        }).then((resp) => resp.json());
        if (result.type === "Success") {
            console.log(result.result[0])
            setTeamData(result.result[0].teamMembers)
            setLoading(false);
        } else {
            console.log(result)
            setLoading(false);
            toast.error(result.message);
        }
    }
    useEffect(() => {
        if (teamData.length == 0) {
            getTeamData()
        }
    })
    return (<>
        {loading ? <LoadingScreen /> : <><Navbar />
            <div className="inline-block lg:flex lg:justify-between lg:items-center mt-12 w-[100%]">
                <div className="mt-8 flex flex-col md:flex-row ml-16 flex-wrap">
                    {teamData.map((data) => {
                        return (
                            <div className="flex flex-col md:flex-row  mb-8 ml-16 ">
                                <img src={data.picture} alt="circle" className="w-16 h-16 ml-8 my-2" />
                                <div className="flex flex-col">
                                    <h1 className="ml-8 font-Changa text-black text-2xl font-bold lg:mt-0 ">{data.playerName}</h1>
                                    <div className="flex flex-col ml-8">
                                        <h2 className="text-black text-black font-circularStd font-semibold text-lg ">Age: {data.age}</h2>
                                        <h2 className="text-black flex flex-row text-extendedNameColor font-circularStd font-semibold text-lg ">Height: {data.height}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {teamData.map((data) => {
                        return (
                            <div className="flex flex-col md:flex-row  mb-8 ml-16 ">
                                <img src={data.picture} alt="circle" className="w-16 h-16 ml-8 my-2" />
                                <div className="flex flex-col">
                                    <h1 className="ml-8 font-Changa text-black text-2xl font-bold lg:mt-0 ">{data.playerName}</h1>
                                    <div className="flex flex-col ml-8">
                                        <h2 className="text-black text-black font-circularStd font-semibold text-lg ">Age: {data.age}</h2>
                                        <h2 className="text-black flex flex-row text-extendedNameColor font-circularStd font-semibold text-lg ">Height: {data.height}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {teamData.map((data) => {
                        return (
                            <div className="flex flex-col md:flex-row  mb-8 ml-16 ">
                                <img src={data.picture} alt="circle" className="w-16 h-16 ml-8 my-2" />
                                <div className="flex flex-col">
                                    <h1 className="ml-8 font-Changa text-black text-2xl font-bold lg:mt-0 ">{data.playerName}</h1>
                                    <div className="flex flex-col ml-8">
                                        <h2 className="text-black text-black font-circularStd font-semibold text-lg ">Age: {data.age}</h2>
                                        <h2 className="text-black flex flex-row text-extendedNameColor font-circularStd font-semibold text-lg ">Height: {data.height}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {teamData.map((data) => {
                        return (
                            <div className="flex flex-col md:flex-row  mb-8 ml-16 ">
                                <img src={data.picture} alt="circle" className="w-16 h-16 ml-8 my-2" />
                                <div className="flex flex-col">
                                    <h1 className="ml-8 font-Changa text-black text-2xl font-bold lg:mt-0 ">{data.playerName}</h1>
                                    <div className="flex flex-col ml-8">
                                        <h2 className="text-black text-black font-circularStd font-semibold text-lg ">Age: {data.age}</h2>
                                        <h2 className="text-black flex flex-row text-extendedNameColor font-circularStd font-semibold text-lg ">Height: {data.height}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {teamData.map((data) => {
                        return (
                            <div className="flex flex-col md:flex-row  mb-8 ml-16 ">
                                <img src={data.picture} alt="circle" className="w-16 h-16 ml-8 my-2" />
                                <div className="flex flex-col">
                                    <h1 className="ml-8 font-Changa text-black text-2xl font-bold lg:mt-0 ">{data.playerName}</h1>
                                    <div className="flex flex-col ml-8">
                                        <h2 className="text-black text-black font-circularStd font-semibold text-lg ">Age: {data.age}</h2>
                                        <h2 className="text-black flex flex-row text-extendedNameColor font-circularStd font-semibold text-lg ">Height: {data.height}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div></>}

    </>)
}
export default TeamPage;