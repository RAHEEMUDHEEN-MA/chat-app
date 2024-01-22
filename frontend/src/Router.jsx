import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const Router = () => {
  return (
    <div>
      {/* <Login/> */}
      {/* <SignUp/> */}
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Login/></>}/>
          <Route path="/login" element={<><Login/></>}/>
          <Route path="/signup" element={<><SignUp/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
