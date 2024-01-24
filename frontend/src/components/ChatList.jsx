import React, { useEffect, useState } from "react";
import "../assets/styles/ChatList.css";
import axios from "axios";

const ChatList = ({ userdata }) => {
  const [connections, setconnection] = useState([]);
  console.log("friends : ",connections)
  const _id = userdata._id;
  console.log("list of friends User:", _id);

  useEffect(() => {
    const loadlist = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/chatapp/chatlist/${_id}`
        );
        setconnection(response.data.friendlist);
        // console.log("friends : ",connections)
        console.log("response : ",response)
      } catch (error) {}
    };
    loadlist();
  }, [_id]);

  return (
    <div className="chat_list">
    <div className="chat_list_head">
      <h2>Chat App</h2>
    </div>
    <div className="chat_list_container">
      {/* {connections.map((contents) => (
        <div key={contents}>
          <p>{contents}</p>
        </div>
      ))} */}
    </div>
  </div>
  );
};

export default ChatList;
