import "../assets/styles/SideNavBar.css";
import { Button, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdChatbubbles } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { GiMushroomHouse } from "react-icons/gi";
import { useEffect, useState } from "react";

// const chatIcon=require("../assets/icons&logos/chat-96.png")
// import chaticon from '../assets/styles/icons8-twitter-circled-50.png'

const SideNavBar = ({ userdata, socket }) => {
  console.log("socket at navbar", socket);
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);


  // useEffect(() => {
  //   socket.emit("setOnline", userdata._id);
  // }, [0]);

  // console.log("socket idddd!!!!!!!!!!!!!!!!!",socket.connected)

  const logout = () => {
    // console.log("Disconnecting socketttt...");
    // setSmShow(true)
    // socket.disconnect();

    navigate("/", { replace: true });
    userdata=null
    // socket.emit("setOffline", userdata._id);
    // userdata=null
  };
  const USERDP = userdata?.name ? userdata.name.charAt(0) : "N";
  // const USERDP = "A"

  return (
    <div>

<Modal
        variant="secondary"
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
           Log Out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5">
          <Button variant="danger" onClick={logout}>Log out</Button>
          <Button  variant="secondary">cancel</Button>
        </Modal.Body>
      </Modal>

      <div className="navbar_holder">
        <div className="top_bar ">
          <div title={userdata.name} className="navbar_profile ">
            <NavLink title={userdata.name} class="userDP" to="/profile">
              {/* <FaUser  size={25}/> */}
              <h1>{USERDP}</h1>
            </NavLink>
          </div>

          <NavLink
            className="linkss"
            to="/home/chat"
            activeClassName="activeLink"
          >
            <IoMdChatbubbles className="navIcons" />
          </NavLink>

          <NavLink
            className="linkss"
            to="/home/search"
            activeClassName="activeLink"
          >
            <MdPersonSearch className="navIcons" />
          </NavLink>

          <NavLink
            className="linkss"
            to="/home/requests"
            activeClassName="activeLink"
          >
            <FaUserFriends className="navIcons" />
          </NavLink>

          <NavLink
            className="linkss"
            id="chatRoomBTN"
            to="/home/randomchat"
            activeClassName="activeLink"
          >
            <GiMushroomHouse className="navIcons" />
          </NavLink>
        </div>

        <NavLink id="logoutBTN" className={"linkss"} >
          <CgLogOut className="navIcons" size={25} onClick={ ()=>{setSmShow(true)}} />
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavBar;
