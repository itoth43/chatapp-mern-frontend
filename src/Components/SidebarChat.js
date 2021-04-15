import React, { useState } from 'react';
import "../style/SidebarChat.css";
import { Avatar, Input, Button } from '@material-ui/core';
import axios from '../axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

const SidebarChat = ({ addNewChat, chatCreator, chatName, chatRecipient }) => {
    const [openChatCreate, setOpenChatCreate] = useState(false);
    const [chatRoom, setChatRoom] = useState('');
    const [recipient, setRecipient] = useState('');
    const [{ user }] = useStateValue();

    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

    const createChat = async (e) => {
        e.preventDefault();
    
        if (chatRoom) {
            // create new room document in mongodb
            await axios.post('/chats/new', {
                name: chatRoom,
                user: user?.displayName,
                recipient: recipient,
            })
        }

        setChatRoom('');
        setRecipient('');
    }

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return !addNewChat ? (
        <Link to={`/rooms/${chatName}`} className="sidebar-chat__links" >
            <div className="sidebar-chat">
                <Avatar alt={chatName} src={`https://avatars.dicebear.com/api/initials/${chatName}.svg`} />
                <div className="sidebar-chat__info">
                    <h2>{chatName}</h2>
                    <p>{chatCreator} is Chatting with: {chatRecipient}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="newchat">
            {/* Create Chat Modal */}
            <Modal
            open={openChatCreate}
            onClose={() => setOpenChatCreate(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="newchat__create">
                        <center>
                            <h1>Create Your Chat Room</h1>
                        </center>
                        <Input 
                            className="newchat__create-input"
                            placeholder="room name..."
                            type="text"
                            value={chatRoom}
                            onChange={(e) => setChatRoom(e.target.value)}
                        >
                        </Input>
                        <Input 
                            className="newchat__create-input"
                            placeholder="friend to chat..."
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        >
                        </Input>
                        <Button type="submit" onClick={createChat}>Add new Chat</Button>
                    </form>
                </div>
            </Modal>
            <div onClick={() => setOpenChatCreate(true)}
            className="newchat__sidebar-chat">
                <AddCommentIcon /> 
                <h3>Start New Chat</h3>
            </div>
        </div>
    )
}

export default SidebarChat
