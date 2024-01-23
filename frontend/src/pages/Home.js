import React from 'react';
import SideNavBar from '../components/SideNavBar';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import { BrowserRouter, Route, Router } from 'react-router-dom';

const Home = ({ userdata }) => {
  var userData=userdata
  // const Connections=["connections",userData.connections]
  // console.log(Connections)
 

  return (
    <div style={{display:"flex"}}>
      <SideNavBar userdata={userData} />

      
        {/* <Route path="/home/chat" element={<><ChatList/></>}/> */}
       
     

      
      
    </div>
  );
};

export default Home;
