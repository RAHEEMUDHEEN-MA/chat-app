import React, { useEffect, useState } from "react";
import "../assets/styles/ChatList.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { ClimbingBoxLoader, GridLoader, ScaleLoader } from "react-spinners";
// import io from "socket.io-client";

const ChatList = ({ userdata }) => {
  const [Friends, setFriends] = useState([]);
  const [loading,setLoading]=useState(true)
  // const [socket,setSocket]=useState()
  // const testobj={data:"test"}

  const _id = userdata._id;
 

  useEffect(() => {
    const loadlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/chatapp/chatlist/${_id}`
        );
        setTimeout(() => {
          setFriends(response.data.user.connections);
        setLoading(false)

        }, 500);
        console.log("chat list response : ", response.data.user);
      } catch (error) {}
    };
    loadlist();
  }, [_id,]);
  console.log("FRIENDS:", Friends);

  return (
    <div className="chat_list">
      <div className="chat_list_head d-flex  ">
        <h3>Messages</h3>
        
        {/* <Link to="/home/randomchat">room</Link> */}
      </div>
      <div className="chat_list_container" style={{}}>

        {loading?<div style={{display:"flex", width:"100%",height:"80vh",justifyContent:"center",alignItems:"center", }}>
          <ScaleLoader color="rgba(115, 109, 109, 0.41)" size={50}/>
        </div>:""}

        {Friends.map((friend) => (
          <Link
            className="rounded-2 bg-dark"
            key={friend._id}
            to={{ pathname: `/home/chat/${friend._id}` }}
          >
            <div className="chatListItem">
              <div className="listItemDp">
                  <FaUser   size={25}/>

              </div>
              <div>
                <p className="text-black">{friend.name}</p>
                <p className="userStatus text-black-50" style={{textAlign:"left"}}>offline</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
