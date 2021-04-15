import React, { /*useEffect,*/ useState } from 'react';
import "../style/Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton, Button } from '@material-ui/core';
import SidebarChat from "../Components/SidebarChat";
import { auth } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useStateValue } from '../StateProvider';
import { actionTypes } from "../reducer";

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
      backdropFilter: '#ffffff',
    },
  }));

const Sidebar = ({ chats, device }) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [{ user }, dispatch] = useStateValue();
    const [openUserOptions, setOpenUserOptions] = useState(false);

    return (
        <div className="sidebar" id={device}>

            {/* userOptions Modal */}
            <Modal
                open={openUserOptions}
                onClose={() => setOpenUserOptions(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="app__useroptions">
                        <center>
                            <h1>Chat App</h1>
                            <Button onClick={() => {
                                auth.signOut().then(() => {
                                    dispatch({
                                    type: actionTypes.SET_USER,
                                    user: null,
                                    });
                                }).catch((error) => (error.message));
                                    setOpenUserOptions(false);
                            }}>Logout</Button>         
                        </center>           
                    </div>
                </div>
            </Modal>

            <div className="sidebar__header">
                <div 
                    className="sidebar__header-left"><Avatar 
                    alt={ user?.displayName } 
                    src={ user?.photoURL }
                    onClick={() => {setOpenUserOptions(true)}} 
                    style={{cursor:"pointer"}}
                />
                </div>
                <div className="sidebar__header-right">
                    <IconButton>
                        <DonutLargeIcon style={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style={{ color: "white" }} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style={{ color: "white" }} />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchbar">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start new chat"></input>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {chats.map((chat) => {
                    return (chat.user === user.displayName || chat.recipient === user.displayName) && <SidebarChat chatCreator={chat.user} chatName={chat.name} chatRecipient={chat.recipient} />
                })}
            </div>
        </div>
    )
}

export default Sidebar

