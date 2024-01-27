import React, { useEffect, useState } from "react";

import SideNavBar from "../components/SideNavBar";

const Home = ({ userdata }) => {
  var userData = userdata;

  const [socket, setSocket] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <SideNavBar userdata={userData}  />
    </div>
  );
};

export default Home;
