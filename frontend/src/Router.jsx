import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import AddFriend from "./components/AddFriend";
import ViewRequests from "./components/ViewRequests";
// import FriendsProfile from "./components/FriendsProfile";

const Router = () => {
  const [userdata,setuserdata]=useState([])

  const setUserDataHandler = (data) => {
    setuserdata(data);
  };
  console.log("At Router :",userdata)
  return (
    <div style={{display:"flex"}}>
      {/* <div style={{display:"flex"}}>
        <SideNavBar/>
        <ChatList/>
        <Chat/>
      </div> */}
      {/* <FriendsProfile/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Login setuserdata={setUserDataHandler} /></>}/>
          <Route path="/signup" element={<><SignUp/></>}/>
          <Route path="/login" element={<><Login setuserdata={setUserDataHandler}/></>}/>
          <Route path="/home" element={<><Home userdata={userdata}/><ChatList userdata={userdata}/></>}/>
          <Route path="/home/chat" element={<><Home userdata={userdata} /><ChatList  userdata={userdata}/></>}/>
          <Route path="/home/chat" element={<><Home userdata={userdata} /><ChatList  userdata={userdata}/></>}/>
          <Route path="/home/chat/:id" element={<><Home userdata={userdata} /><ChatList  userdata={userdata} /><Chat userdata={userdata} /></>}/>
          <Route path="/home/search" element={<><Home userdata={userdata} /><AddFriend userdata={userdata}/></>}/>
          <Route path="/home/requests" element={<><Home userdata={userdata} /><ViewRequests userdata={userdata}/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
