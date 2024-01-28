import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

import FriendsProfile from "./FriendsProfile";

const Chat2 = ({ userdata, socket }) => {
  const userData = userdata.userdata;

  const friendID = useParams();

  const [friendMeta, setFriendMeta] = useState({});
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  console.log("typing : ", message);

  // --------------------------------------------

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //fetching selected friends data for profile-------------

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/chatapp/find/${friendID.id}`
        );
        setFriendMeta(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriend();

    const fetchChatHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7070/chatapp/chathistory",
          {
            sender_id: userdata._id,
            receiver_id: friendID.id,
          }
        );
        setMessageList(response.data);
      } catch (error) {}
    };
    fetchChatHistory();
  }, [friendID]);

  //sending message---------------------------------------------

  const sendMessage = async () => {
    if (message !== "" || !userdata || !friendID) {
      const messageData = {
        sender_id: userdata._id,
        receiver_id: friendID.id,
        content: message,
        sender_name: userdata.name,

        date: new Date(Date.now()).toISOString(),
      };
      await socket.emit("sendChatMessage", messageData);
      setMessageList((prevMessages) => [...prevMessages, messageData]);

      setMessage("");
    }
    return () => {
      // Cleanup the event listener when the component is unmounted
      socket.off("sendChatMessage");
    };
  };

  // recieving message------------------------------------------

  useEffect(() => {
    socket.off("recieveChatMessage").on("recieveChatMessage", (message) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!56");
      if (message.receiver_id === userdata._id) {
        setMessageList((prevMessages) => [...prevMessages, message]);
      }
    });
  }, [message]);

  useEffect(() => {
    setMessageList([]);
  }, [friendID]);

  console.log("chat history yess : ", messageList);

  return (
    <div className="chat">
      <div className="d-flex align-items-center gap-5 p-3 px-5 bg-primary-subtle">
        <div>
          <button className="friend_dp" onClick={handleShow}>
            {friendMeta?.name ? friendMeta.name.charAt(0) : "U"}
          </button>
        </div>
        <h5 className="text-white mx-5 text">
          {friendMeta ? friendMeta.name : "user"}
        </h5>
      </div>

      <div className="chat_body bg-gray h-50">
        <div className="p-3">
          {messageList.map((chat) => (
            <div className="m-1  bg-danger-subtle">
              <p>{chat.content}</p>
              <p>{chat.sender_name}</p>
              <p>{chat.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        <FormGroup className="d-flex gap-3 m-4 ">
          <FormControl
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            placeholder="type your message"
            className="w-75 xl"
          ></FormControl>
          <Button
            disabled={!message}
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </Button>
        </FormGroup>
      </div>

      {/* --------------------------------------------- */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FriendsProfile data={{ friendMeta, userData }} />
        </Modal.Body>
      </Modal>

      {/* ------------------------------------------------------- */}
    </div>
  );
};

export default Chat2;
