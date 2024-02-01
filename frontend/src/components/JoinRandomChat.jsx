import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../assets/styles/JoinRandomChat.css"
import RandomChat from "./RandomChat";
import { GiMushroomHouse } from "react-icons/gi";

const JoinRandomChat = ({ userdata, socket }) => {
  const [name,setanme] = useState(userdata.name)
  // const [name,setanme] = useState("tester")
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


<div className="d-flex justify-content-center w-100" style={{minWidth:"600px", backgroundColor:"#dad3ff", margin:"1px 5px" ,borderRadius:"6px"}}>
{/* <GiMushroomHouse className="joinroomBG" size={200}/> */}
   
    {!showChat?(<div className="d-flex w-100 ">
      <div style={{ width: 400, margin: "auto", marginTop: "200px" }}>
      
        <Form
          style={{
            backgroundColor:"white",
            boxShadow: " 1px 1px 15px #6a658283",
            borderRadius: "15px",
            padding: "45px 60px",
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-3"><h4 style={{ color: "gray" }}>Join Room </h4> <GiMushroomHouse size={29} color="orange"/></div>
          <Form.Group className="mt-3" controlId="formBasicEmail">
            {/* <Form.Control type="email" placeholder="Enter Name"  /> */}
          </Form.Group>
        
          <Form.Group className="my-2" controlId="formBasicPassword">
            <Form.Control
            style={{border:"none" ,boxShadow:"1px 1px 10px #6a658283", padding:"15px", borderRadius:"10px"}}
              type="text"
              placeholder="Room ID"
              onKeyPress={(e) => {
                e.key === "Enter" && joinRoom();
              }}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </Form.Group>

          <Button className="px-4 py-2 mt-3 rounded-4"  color="orange" onClick={joinRoom}>
            Join
          </Button>
        </Form>
      </div>
    </div>):(<RandomChat socket={socket} name={name} room={room}/>)}
</div>
   
    
  );
};

export default JoinRandomChat;
