import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SideNavBar from "./components/SideNavBar";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import AddFriend from "./components/AddFriend";

const Router = () => {
  const [userdata,setuserdata]=useState([])

  const setUserDataHandler = (data) => {
    setuserdata(data);
  };
  return (
    <div style={{display:"flex"}}>
      {/* <div style={{display:"flex"}}>
        <SideNavBar/>
        <ChatList/>
        <Chat/>
      </div> */}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Login setuserdata={setUserDataHandler} /></>}/>
          <Route path="/signup" element={<><SignUp/></>}/>
          <Route path="/login" element={<><Login setuserdata={setUserDataHandler}/></>}/>
          <Route path="/home" element={<><Home userdata={userdata}/></>}/>
          <Route path="/home/chat" element={<><Home userdata={userdata} /><ChatList userdata={userdata}/></>}/>
          <Route path="/home/search" element={<><Home userdata={userdata} /><AddFriend userdata={userdata}/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
