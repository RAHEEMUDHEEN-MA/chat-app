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
  const [tokenError, setTokenError] = useState(null);
  const [typingStatus, setTypingStatus] = useState(false);

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
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchChatHistory = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7070/chatapp/chathistory",
          {
            sender_id: userdata._id,
            // sender_id: "65b0b0b29046aea7e722c9f5",
            receiver_id: friendID.id,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setMessageList(response.data);
      } catch (error) {
        if (error.response && error.response.status == 401) {
          setTokenError(error.response.data.message);
        }
      }
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
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!56");
      if (message.receiver_id === userdata._id) {
        setMessageList((prevMessages) => [...prevMessages, message]);
      }
    });
  }, [message]);

  useEffect(() => {
    setMessageList([]);
  }, [friendID]);

  // ---------------------------------------------------------------
  const typing = () => {
    const typingData = {
      typingID: userdata._id,
      recieveingID: friendID.id,
    };
    socket.emit("typing", typingData);
    // console.log("im typing",typingData)
  };

  useEffect(() => {
    socket.on("ListenTyping", (data) => {
      console.log(data);
      if (data.typingID === friendID.id && data.recieveingID === userdata._id) {
        console.log("typing");
        setTypingStatus(true);
        setTimeout(() => {
          setTypingStatus(false);
        }, 500);
      }
    });
  }, [typingStatus]);

  return (
    <div className="chat">
      <Modal show={tokenError != null}>
        <Modal.Header>
          <Modal.Title>Token Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Token is expired in this section.Please login again to coutinue the
          seection
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Link to={"/"}>
            <Button variant="primary">Login</Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <div className=" chatHeader">
        <Link to={{ pathname: `/home` }}>
          <div className="backBTN">
            <IoIosArrowBack size={35} color="gray" />{" "}
          </div>
        </Link>
        <div className="listItemProfile">
          
          {friendMeta.profile_photo?( <img onClick={handleShow}  className="listItemDp" src={`http://localhost:7070/profile/${friendMeta.profile_photo}`} alt="" /> ):(<div className="listItemDp" onClick={handleShow}>
            <FaUser size={25} />
          </div>)}

          <div style={{  }}>
            <h5 className=" listItemProfileName m-0">
              {friendMeta ? friendMeta.name : "user"}
            </h5>
            <div
              style={{ height: "20px", overflow: "hidden", marginTop: "0px", textAlign:"left", color:"gray" ,fontSize:"12px"}}
            >
              {typingStatus ? <p >typing..</p> : <> </>}
            </div>
          </div>
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
        <FormGroup className="d-flex gap-3 mx-4 my-3 ">
          <FormControl
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              typing();
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

      <Modal className="centered " show={show} onHide={handleClose}>
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
