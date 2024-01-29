import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../assets/styles/RandomChat.css";
import { IoMdSend } from "react-icons/io";
import { Button } from "react-bootstrap";
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
            color: "black",
         
            padding: "5px",
          }}
        >
          <h2>Random Chat</h2>
        </div>
        <div className="chat-body" style={{ height: "480px" }}>
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
        <div className="chat-footer p-2 py-3 w-100  d-flex">
          <input
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
              padding: "8px",
              border: "none",
              borderRadius: "10px",
              color: "black",
              width:"100%"
            }}
          />
          <Button
            onClick={sendMessage}
            className="mx-2"
            style={{
              boxShadow: "2px 1px 5px gray",
              height: "40px",
             
            }}
          >
            {/* <IoMdSend /> */}
            send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RandomChat;
