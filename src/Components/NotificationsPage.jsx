import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from './LoadingScreen';

const NotificationCard = ({ message, setLoading, getNotifications }) => {
    const handleAccept = async () => {
        const notification = message;
        setLoading(true)
        // const result = await fetch(`https://match-karao-backend.vercel.app/acceptPlayRequest`, {
            const result = await fetch(`https://match-karao-backend.vercel.app/acceptPlayRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification: notification })
        }).then((resp) => resp.json());
        if (result.type === "Success") {
            toast.success("Successfully Accepted Request")
            setLoading(false);
            getNotifications();
        } else {
            setLoading(false);
            toast.error(result.message);
        }
    };

    const handleReject = async () => {
        setLoading(true)
        const result = await fetch(`https://match-karao-backend.vercel.app/removePlayRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: message._id })
        }).then((resp) => resp.json());
        if (result.type === "Success") {
            toast.success("Request Dismissed")
            setLoading(false);
            getNotifications();

        } else {
            setLoading(false);
            toast.error(result.message);
        }
    };
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center font-Changa ">
            {message.type === "1" ? <><p className="text-lg font-bold mb-4">Team {message.teamName} wants to play at {message.venue} in {message.location} on {message.date} {" "}
                from {message.startTime} till {message.endTime}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-green-500 text-white px-4 font-bold py-2 rounded-md hover:bg-green-700"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 font-bold rounded-md hover:bg-red-700"
                        onClick={handleReject}
                    >
                        Reject
                    </button>
                </div> </> : <div>
                <p className="text-lg font-bold mb-4">Team {message.teamName} has to accepted to play at {message.venue} in {message.location} on {message.date} {" "}
                    from {message.startTime} till {message.endTime}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 font-bold rounded-md hover:bg-red-700"
                        onClick={handleReject}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
            }

        </div>
    );
};

const Board = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getNotifications() {
        const result = await fetch(`https://match-karao-backend.vercel.app/getNotifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamID: localStorage.getItem("teamID")
            })
        }).then((resp) => resp.json());
        if (result.type === "Success") {
            setNotifications(result.notifications);
        } else {
        }
    }
    useEffect(() => {
        getNotifications();
    }, [])


    return (
        <>
            {loading ? <LoadingScreen /> : <>
                <Navbar />
                <div className="flex flex-col gap-4 p-4">
                    {notifications.map((notification, index) => (
                        <NotificationCard
                            key={index}
                            message={notification}
                            setLoading={setLoading}
                            getNotifications={getNotifications}
                        />
                    ))}
                </div></>}

        </>
    );
};

export default Board;