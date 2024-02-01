import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/Chat.css";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import moment from "moment-timezone";

import FriendsProfile from "./FriendsProfile";

const Chat2 = ({ userdata, socket }) => {
  const userData = userdata.userdata;

  const friendID = useParams();

  const [friendMeta, setFriendMeta] = useState({});
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  console.log("typing : ", message);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [message, messageList]);

  const Navigatee = useNavigate();
  
  // onKeyDown={(e) => {
  //   if (e.key === "Escape") {
  //     alert("Escape key pressed");
  //     // Uncomment the following line to navigate back
  //     // Navigatee(-1);
  //   }
  // }}
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
            // sender_id: "65b0b0b29046aea7e722c9f5",
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

  // useEffect(() => {
  //   socket.off("recieveChatMessage").on("recieveChatMessage", (message) => {
  //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!56");
  //     if (message.receiver_id === userdata._id) {
  //       setMessageList((prevMessages) => [...prevMessages, message]);
  //     }
  //   });
  // }, [message]);

  useEffect(() => {
    setMessageList([]);
  }, [friendID]);

  console.log("chat history yess : ", messageList);

  return (
    <div className="chat">
      <div className=" chatHeader">
        <Link to={{ pathname: `/home` }}>
          <div className="backBTN">
            <IoIosArrowBack size={35} color="gray" />{" "}
          </div>
        </Link>
        <div className="listItemProfile">
          <div className="listItemDp" onClick={handleShow}>
            <FaUser size={25} />
          </div>

          <h5 className=" listItemProfileName">
            {friendMeta ? friendMeta.name : "user"}
          </h5>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}

      <div className="chat_body" ref={chatBodyRef}>
        <div className="p-3">
          {messageList.map((chat) => (
            <div
              className="chatContentBody"
              id={chat.sender_id == userdata._id ? "yourContent" : "none"}
            >
              <div className="chatContentWraper">
                <p className="chatContent">{chat.content}</p>
                {/* <p>{chat.sender_name}</p> */}
                {/* const istDate = moment.utc(utcDate).tz("Asia/Kolkata").format(); */}

                {/* <p className="chatTime">{chat.date}</p> */}
                <p className="chatTime">
                  {moment.utc(chat.date).tz("Asia/Kolkata").format("HH:mm")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ----------------------------------------------------------- */}
      <div className="chatFooter ">
        <FormGroup className="d-flex gap-3 m-4 ">
          <FormControl
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              } else if (e.key === "Escape") {
                // alert("Escape key pressed");
                Navigatee(-1);
              }
            }}
            placeholder="type your message"
            // className="w-75 xl"
          ></FormControl>
          <Button
            className="sendBTN"
            disabled={!message}
            onClick={() => {
              sendMessage();
            }}
          >
            <IoMdSend size={30} />
          </Button>
        </FormGroup>
      </div>

      {/* --------------------------------------------- */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FriendsProfile data={{ friendMeta, userdata }} />
        </Modal.Body>
      </Modal>

      {/* ------------------------------------------------------- */}
    </div>
  );
};

export default Chat2;
