import React from "react";
import SideNavBar from "../components/SideNavBar";

const Home = ({ userdata }) => {
  var userData = userdata;

  return (
    <div style={{ display: "flex" }}>
      <SideNavBar  userdata={userData} />
    </div>
  );
};

export default Home;
