import React, { useEffect, useState } from "react";
import "../assets/styles/ChatList.css";
import axios from "axios";
import { Link,  } from "react-router-dom";

const ChatList = ({ userdata }) => {
  const [Friends, setFriends] = useState([]);
  const testobj={data:"test"}

  const _id = userdata._id;

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
      <div className="chat_list_head">
        <h2>Chats</h2>
      </div>
      <div className="chat_list_container" style={{}}>
        {Friends.map((friend) => (
          
          <Link
            key={friend._id}
            
            to={{ pathname: `/home/chat/${friend._id}`, state: { testobj } }}
          >
            <div className="d-flex flex-column gap1 p-1">
              <div className=" border-bottom m-1 p-3 d-flex gap-5 rounded-2">
                <h1 style={{textDecoration:"none"}} className="px-3 text-light  bg-danger focus-ring-dark rounded-5">
                  {friend.name.charAt(0)}
                </h1>
                <p>{friend.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
