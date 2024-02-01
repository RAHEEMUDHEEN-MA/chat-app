import React, { useEffect, useState } from "react";
import "../assets/styles/Home.css";

import SideNavBar from "../components/SideNavBar";

const Home = ({ userdata, socket }) => {
  var userData = userdata;
  

  return <SideNavBar userdata={userData} socket={socket} />;
};

export default Home;
