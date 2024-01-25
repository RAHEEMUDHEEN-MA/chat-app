import React, { useEffect, useState } from "react";
import "../assets/styles/Chat.css";
import { Button, FormControl, FormGroup, Modal, } from "react-bootstrap";
import {  useParams } from "react-router-dom";
import axios from "axios";
import FriendsProfile from "./FriendsProfile";

const Chat = (userdata) => {
  const userData=userdata.userdata
  const friendID = useParams();

  const [friendMeta, setFriendMeta] = useState({});
  const [message, setMessage] = useState("");
  console.log(message);
  console.log("UserData At Chat : ",userData)
  console.log("selectedFriendID", friendID);
  console.log("selectedFriendMeta",friendMeta);


  // --------------------------------------------

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // ---------------------------------------------

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
    
  }, [friendMeta]);

  return (
    <div className="chat">
      <div className="d-flex align-items-center gap-5 p-3 px-5 bg-primary-subtle">
        <div  >
          <button className="friend_dp" onClick={handleShow}>{friendMeta?.name ? friendMeta.name.charAt(0) : "U"}</button>
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

      {/* --------------------------------------------- */}

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <FriendsProfile  data={{friendMeta,userData}} />

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* ------------------------------------------------------- */}
    </div>
  );
};

export default Chat;
