import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useStateValue } from './StateProvider';

const App = () => {
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  // using AXIOS to pull the messages and chats to the front end
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/chats/sync").then((response) => {
      setChats(response.data);
    });
  }, []);

  // for pushing backend MongoDB messages and chats to the front end pusher-js and pusher (backend) communicated based on the trigger in our server.js
  useEffect(() => {
    const pusher = new Pusher("98e9b0f3e4100a393b03", {
      cluster: "us2"
    });

    const messageChannel = pusher.subscribe("messages");
    messageChannel.bind("inserted", (newMessage) => {
      // Where messages are coming in from the backend...
      setMessages([...messages, newMessage])
    });

    const chatChannel = pusher.subscribe("chats");
    chatChannel.bind("inserted", (newChat) => {
      // Where messages are coming in from the backend...
      setMessages([...chats, newChat])
    });

    // clean up function to make sure we only ever have one subscriber
    return () => {
      messageChannel.unbind_all();
      messageChannel.unsubscribe();
      chatChannel.unbind_all();
      chatChannel.unsubscribe();
    };

  }, [messages, chats])

  return (
    <div className="app">
      {!user ? (
            <Login />
      ) : (
        <div className="app__body">
          <Router>
              <Sidebar chats={chats} device={"web"} />
            <Switch>
              <Route path="/rooms/:chatId">
                  <Chat messages={messages} username={user.displayName} />
              </Route>
                <Route path="/rooms">
                    <Sidebar chats={chats} device={"mobile"} />
                </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
