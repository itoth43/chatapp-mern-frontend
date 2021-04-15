import React, { useState, useEffect } from 'react';
import "../style/Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Message from "../Components/Message";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

const Chat = ({ messages, username }) => {
    const [input, setInput] = useState('');
    const [chatName, setChatName] = useState('');
    const { chatId } = useParams();
    const [{ user }] = useStateValue();

    useEffect(() => {
        if (chatId) {
            setChatName(chatId);
        }
        
    }, [chatId])

    // Uses AXIOS to send a POST request to the MongoDB server to create a new message for this user and chat.
    const sendMessage = async (e) => {
        e.preventDefault();

        if (input !== '') {
            await axios.post('/messages/new', {
                message: input,
                chatName: chatId,
                name: username,
                timestamp: moment().format("MM/DD/YYYY hh:mm a"),
                received: true,
            })
    
            setInput('');
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="chat__header-backbutton">
                    <Link to={`/rooms`} >
                        <ArrowBackIosIcon />
                    </Link>
                </div>
                <div className="chat__header-left">
                    <Avatar alt={chatId} src={`https://avatars.dicebear.com/api/initials/${chatId}.svg`} />
                </div>
                <div className="chat__header-info">
                    <h3>{chatName}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className="chat__header-right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => {
                    return message.chatName === chatId &&
                    (<Message username={message.name} message={message.message} chatName={message.chatName} timestamp={message.timestamp} messageReceived={message.name === user.displayName} />)
                })}                
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} placeholder="Type a message" 
                        type="text" 
                    />
                    <button onClick={sendMessage}
                    type="submit">
                        <IconButton>
                            <SendIcon />
                        </IconButton>
                    </button>
                </form>
                {/* <IconButton>
                    <MicIcon />
                </IconButton> */}
            </div>
        </div>
    )
}

export default Chat
