import React, { useEffect, useState } from "react";

import SideNavBar from "../components/SideNavBar";

const Home = ({ userdata,socket }) => {
  var userData = userdata;

  // console.log("socket at home!!!!!",socket)

  //   const socketStatus=socket.connected

  // console.log("socket idddd!!!!!!!!!!!!!!!!!",socketStatus)


  // const [socket, setSocket] = useState(null);

  return (
    <div style={{ display: "flex" }}>
      <SideNavBar userdata={userData} socket={socket}  />
    </div>
  );
};

export default Home;
