import { useEffect } from "react";
import "../assets/styles/Home.css";

import SideNavBar from "../components/SideNavBar";
import { HiOutlineDotsVertical } from "react-icons/hi";

const Home = ({ userdata, socket }) => {
  var userData = userdata;
  // useEffect(() => {
  // }, [])

 

  

 
  return <div >
    <div className="TopBar"><h2>Chat App</h2>
    <button><HiOutlineDotsVertical size={25} /></button>
    </div>
    <SideNavBar userdata={userData} socket={socket} />
    </div> 

};

export default Home;
// import img2 from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonscout.com%2Fillustration%2Freact-native-mobile-app-6578313&psig=AOvVaw3fyltktJ_JnIu_WGAr1mjZ&ust=1706854805377000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOCD8uW_iYQDFQAAAAAdAAAAABAE'
