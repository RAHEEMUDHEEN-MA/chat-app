import React, { useEffect, useState } from "react";
import "../assets/styles/Chat.css";
import { Button, FormControl, FormGroup, NavLink } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FriendsProfile from "./FriendsProfile";

const Chat = () => {
  const friendID = useParams();
  console.log("selectedFriendID", friendID);
  const [friendMeta, setFriendMeta] = useState({});
  const [message, setMessage] = useState("");
  console.log(message);
  const [profilestate, setprofilestate] = useState(false);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/chatapp/find/${friendID.id}`
        );
        console.log("api called!!!");

        setFriendMeta(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFriend();
  }, [friendID]);

  useEffect(() => {
    console.log(friendMeta);
  }, [friendMeta]);

  return (
    <div>
      <div className="chat">
        <div className="d-flex align-items-center gap-5 p-4 px-5 bg-primary-subtle">
          <div className="bg-white rounded-5 px-4 py-2 text-success">
            <h2>{friendMeta?.name ? friendMeta.name.charAt(0) : "U"}</h2>
          </div>
          <h5 className="text-white mx-5 text">
            {friendMeta ? friendMeta.name : "user"}
          </h5>
        </div>

        <div className="chat_body"></div>
        <div className="d-flex justify-content-center ">
          <FormGroup className="d-flex gap-3 m-4 w-100">
            <FormControl
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="type your message"
              className="w-75 xl"
            ></FormControl>
            <Button>Send</Button>
          </FormGroup>
        </div>
      </div>

      <FriendsProfile/>
    </div>
  );
};

export default Chat;
