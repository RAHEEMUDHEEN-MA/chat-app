
import '../assets/styles/SideNavBar.css';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdChatbubbles } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";


// const chatIcon=require("../assets/icons&logos/chat-96.png")
// import chaticon from '../assets/styles/icons8-twitter-circled-50.png'




const SideNavBar = ({ userdata,socket }) => {
  console.log("socket at navbar",socket)
  const navigate = useNavigate();
  // console.log("socket idddd!!!!!!!!!!!!!!!!!",socket.connected)

  const logout=()=>{
 
      // console.log("Disconnecting socket...");
      // socket.disconnect();
      alert("logout")
      navigate('/new-route', { replace: true });
      // userdata=null
  
  }
  const USERDP = userdata?.name ? userdata.name.charAt(0) : '';
  // const USERDP = "A"

  return (
    <div>
      <div className='navbar_holder'>
      <div className='top_bar'>
        <div className='navbar_profile'>
          <NavLink class='userDP'  to="/profile">
          {/* <FaUser  size={25}/> */}
          <h1>{USERDP}</h1>
        

          </NavLink>
        </div>

        <NavLink className="linkss" to="/home/chat" activeClassName="activeLink">
            <IoMdChatbubbles className="navIcons" />
            
          </NavLink>

          <NavLink className="linkss" to="/home/search" activeClassName="activeLink">
            <MdPersonSearch className="navIcons" />
          </NavLink>

          <NavLink className="linkss" to="/home/requests" activeClassName="activeLink">
            <FaUserFriends className="navIcons" />
          </NavLink>
      </div>

      <NavLink className={"linkss"} to="/">
        <CgLogOut className='navIcons' size={25} onClick={logout} />


      </NavLink>
    </div>
    </div>
  );
};

export default SideNavBar;
