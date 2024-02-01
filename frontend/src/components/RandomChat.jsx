import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../assets/styles/RandomChat.css";
import { IoMdSend } from "react-icons/io";
import { Button, FormControl } from "react-bootstrap";
function RandomChat({ socket, room, name }) {
  const [curMessage, setcurMessage] = useState("");
  const [messageList, setmessageList] = useState([]);

  const sendMessage = async () => {
    if (curMessage !== "") {
      const messageData = {
        author: name,
        room: room,
        message: curMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getDate(),
      };
      await socket.emit("sendRandomMessage", messageData);
      setmessageList((list) => [...list, messageData]);
      setcurMessage("");
    }
  };
  useEffect(() => {
    socket.off("reciveRandomMessage").on("reciveRandomMessage", (data) => {
      console.log(data);
      setmessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div style={{ margin: "auto" ,width:"100%"}}>
      <div
        className="chat "
        style={{
        
          width: "100%",
        
        
         
        }}
      >
        <div
          className="chat-header p-3"
          style={{
            // backgroundColor: "gray",
            color: "gray",
         
            padding: "5px",
          }}
        >
          <h2>Random Chat</h2>
        </div>
        <div className="chat-body" style={{ height: "480px", padding:"20px" }}>
          <ScrollToBottom className="chatBody">
            {messageList.map((content) => {
              return (
                <div
                  className="message"
                  id={content.author == name ? "yourmessage" : "abc"}
                >
                  <div
                    className="messageContent"
                    id={content.author == name ? "yourcontent" : "abc"}
                  >
                    <p>{content.message}</p>
                  </div>
                  <div
                    className="messageMeta"
                    id={content.author == name ? "yourmeta" : "abc"}
                  >
                    <p className="chat-time">{content.time}</p>
                    <p className="chat-author">{content.author}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className=" d-flex chat-footer gap-3 p-2  w-100  ">
          <FormControl
            value={curMessage}
            onChange={(e) => {
              setcurMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
            type="text"
            placeholder="Enter your message"
            style={{
              boxShadow: "1px 1px 5px gray",
              padding: "18px",
              border: "none",
              borderRadius: "10px",
              color: "black",
              width:"100%",
           
            }}
          />
          <Button
            onClick={sendMessage}
            variant="primary"
            className="mx-2 rounded-5  d-flex justify-content-center align-items-center"
            style={{
              boxShadow: "2px 1px 5px gray",
              // height: "40px",
             
              border:"none"
             
            }}
          >
            {/* <IoMdSend /> */}
            <IoMdSend   size={30}/>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RandomChat;
