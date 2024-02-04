import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ChatList from "./components/ChatList";
import AddFriend from "./components/AddFriend";
import ViewRequests from "./components/ViewRequests";
import Chat2 from "./components/Chat2";
import JoinRandomChat from "./components/JoinRandomChat";
import ChatlistBanner from "./components/ChatlistBanner";
import SearchBanner from "./components/SearchBanner";
import RandomChatBanner from "./components/RandomChatBanner";
import UserProfile from "./components/UserProfile";

const Router = () => {
  const [userdata, setuserdata] = useState([]);
  const [socket, setSocket] = useState();

  const setUserDataHandler = (data) => {
    setuserdata(data);
  };

  return (
    <div style={{ display: "flex" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Login setuserdata={setUserDataHandler} setSocket={setSocket} />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          />

          <Route
            path="/home"
            element={
              <>
                <Home userdata={userdata} socket={socket} />
                <ChatList userdata={userdata} />
                <ChatlistBanner />
              </>
            }
          />
          <Route
            path="/home/chat"
            element={
              <>
                <Home userdata={userdata} />
                <ChatList userdata={userdata} />
                <ChatlistBanner />
              </>
            }
          />

          <Route
            path="/home/chat/:id"
            element={
              <>
                <Home userdata={userdata} />
                <ChatList userdata={userdata} />
                <Chat2 userdata={userdata} socket={socket} />
              </>
            }
          />
          <Route
            path="/home/search"
            element={
              <>
                <Home userdata={userdata} />
                <AddFriend userdata={userdata} />
                <SearchBanner />
              </>
            }
          />

          <Route
            path="/home/profile"
            element={
              <>
                <Home userdata={userdata} />
                <UserProfile/>
                <ChatlistBanner/>
              </>
            }
          />

          <Route
            path="/home/requests"
            element={
              <>
                <Home userdata={userdata} />
                <ViewRequests userdata={userdata} />
                <SearchBanner />
              </>
            }
          />

          <Route
            path="/home/randomchat"
            element={
              <>
                <Home userdata={userdata} socket={socket} />
                <JoinRandomChat userdata={userdata} socket={socket} />
                <RandomChatBanner />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
