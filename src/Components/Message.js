import React from "react";
import "../style/Message.css";

const Message = ({ username, message, timestamp, messageReceived }) => {
    return (
        <div>
            <p className={`chat__message ${messageReceived && "chat__receiver"}`}>
                <span className="chat__username ">{username}</span>
                {message}
                <span className="chat__timestamp">
                    {timestamp}
                </span>
            </p>
        </div>
    )
}

export default Message
