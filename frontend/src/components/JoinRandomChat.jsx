import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import io from "socket.io-client";
import Chat from "./Chat";
import RandomChat from "./RandomChat";

const JoinRandomChat = ({ userdata, socket }) => {
//   const [name,setanme] = useState(userdata.name)
  const [name,setanme] = useState("test")
  const [room, setRoom] = useState();
  console.log(name, room);

  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    // if (name === "" || room === "") {
    //   alert("Error: Both name and room are required to join.");
    // } else {
    //   const data = { name, room };
    //   socket.emit("joinRoom", data);
    //   setShowChat(!showChat);
    // }
    if (!room || !name) {
        alert("provide details")
    }
    else{
            const data = { name, room };
      socket.emit("joinRoom", data);
      setShowChat(!showChat);
    alert("entered")}
  };

  return (


<div className="d-flex justify-content-center w-100">
    {!showChat?(<div className="d-flex w-100 ">
      <div style={{ width: 300, margin: "auto", marginTop: "200px" }}>
        <Form
          style={{
            boxShadow: "1px 4px 25px gray",
            borderRadius: "15px",
            padding: "25px 60px",
          }}
        >
          <h3 style={{ color: "gray" }}>Join Room</h3>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            {/* <Form.Control type="email" placeholder="Enter Name"  /> */}
          </Form.Group>

          <Form.Group className="my-2" controlId="formBasicPassword">
            <Form.Control
              type="texttrtry"
              placeholder="Room ID"
              onKeyPress={(e) => {
                e.key === "Enter" && joinRoom();
              }}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </Form.Group>

          <Button className="px-5 mt-2" variant="primary" onClick={joinRoom}>
            join
          </Button>
        </Form>
      </div>
    </div>):(<RandomChat socket={socket} name={name} room={room}/>)}
</div>
   
    
  );
};

export default JoinRandomChat;
