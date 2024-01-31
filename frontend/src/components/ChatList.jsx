import React, { useEffect, useState } from "react";
import "../assets/styles/ChatList.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
// import io from "socket.io-client";

const ChatList = ({ userdata }) => {
  const [Friends, setFriends] = useState([]);
  // const [socket,setSocket]=useState()
  // const testobj={data:"test"}

  const _id = userdata._id;
  // const _id = "65b0b0b29046aea7e722c9f5";

  // useEffect(() => {
  //   const newsocket = io("http://localhost:7070");
  //   setSocket(newsocket)

  //   // Cleanup function
  //   return () => {
  //     console.log("Disconnecting socket...");
  //     newsocket.disconnect();
  //   };
  // }, []);

  // console.log(socket)

  useEffect(() => {
    const loadlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/chatapp/chatlist/${_id}`
        );
        setFriends(response.data.user.connections);

        console.log("chat list response : ", response.data.user);
      } catch (error) {}
    };
    loadlist();
  }, [_id]);
  console.log("FRIENDS:", Friends);

  return (
    <div className="chat_list">
      <div className="chat_list_head d-flex justify-content-around">
        <h3>Chats</h3>
        <Link to="/home/randomchat">room</Link>
      </div>
      <div className="chat_list_container" style={{}}>
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
