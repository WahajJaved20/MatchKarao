import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';

const NotificationCard = ({ message }) => {
    const handleAccept = (index) => {
        console.log('Request Accepted!'); // Replace with actual functionality
        // You can update the notifications state to remove the accepted notification
    };

    const handleReject = (index) => {
        console.log('Request Rejected!'); // Replace with actual functionality
        // You can update the notifications state to remove the rejected notification
    };
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            {message.type === "1" ? <><p className="text-lg font-medium mb-4">Team {message.teamName} wants to play at {message.venue} in {message.location} on {message.date} {" "}
                from {message.startTime} till {message.endTime}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        onClick={handleReject}
                    >
                        Reject
                    </button>
                </div> </> : <div>
                <p className="text-lg font-medium mb-4">Team {message.teamName} has to accepted to play at {message.venue} in {message.location} on {message.date} {" "}
                    from {message.startTime} till {message.endTime}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
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

    async function getNotifications() {
        const result = await fetch(`http://localhost:5000/getNotifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamID: localStorage.getItem("teamID")
            })
        }).then((resp) => resp.json());
        console.log(result)
        if (result.type === "Success") {
            setNotifications(result.notifications);
        } else {
            console.log(result)
        }
    }
    useEffect(() => {
        getNotifications();
    }, [])


    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 p-4">
                {notifications.map((notification, index) => (
                    <NotificationCard
                        key={index}
                        message={notification}
                    />
                ))}
            </div>
        </>
    );
};

export default Board;