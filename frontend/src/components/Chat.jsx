// import React, { useEffect, useState } from "react";
// import "../assets/styles/Chat.css";
// import { Button, FormControl, FormGroup, Modal } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import FriendsProfile from "./FriendsProfile";
// import io from "socket.io-client";
// const socket = io("http://localhost:7070");

// const Chat = (userdata) => {
//   const userData = userdata.userdata;
//   const friendID = useParams();
//   const [loader,setloader]=useState(true)

//   const [friendMeta, setFriendMeta] = useState({});
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   // const [message, setMessage] = useState("");

//   // const message1="test ok"
//   console.log(message);
//   // console.log("UserData At Chat : ", userData);
//   // console.log("selectedFriendID", friendID.id);
//   // console.log("selectedFriendMeta", friendMeta);

//   // --------------------------------------------

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   // ---------------------------------------------

//   useEffect(() => {
//     const fetchFriend = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:7070/chatapp/find/${friendID.id}`
//         );
//         console.log("api called!!!");

//         setFriendMeta(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchFriend();
//   }, [friendID]);

//   const sendMessage = async () => {
//     if (message !== "" || !userData || !friendID) {
//       const messageData = {
//         sender_id: userData._id,
//         receiver_id: friendID.id,
//         content: message,
//       };
    //   await socket.emit("send_message", messageData);
    //   setMessage("");
//     }

//     socket.emit("socketTest", {});
//   };

//   useEffect(() => {
 
//     socket.emit("loadChatHistory", {
//       sender_id: userData._id,
//       receiver_id: friendID,
//     });
//     console.log("trying to load chat")

    
//     socket.on("receiveChatHistory", (history) => {
//       console.log("chat history",history)
//       setChatHistory(history);
//     });

 
//     socket.on("receive_message", (message) => {
//       console.log("message recived:",message)
//       setChatHistory((prevHistory) => [...prevHistory, message]);
    
//     });

   
//     return () => {
//       // socket.off("receive_chat_history");
//       socket.off("receive_message");
//     };
//   }, [friendID]);

//   console.log("chatss",chatHistory)
//   return (
//     <div className="chat">
//       <div className="d-flex align-items-center gap-5 p-3 px-5 bg-primary-subtle">
//         <div>
//           <button className="friend_dp" onClick={handleShow}>
//             {friendMeta?.name ? friendMeta.name.charAt(0) : "U"}
//           </button>
//         </div>
//         <h5 className="text-white mx-5 text">
//           {friendMeta ? friendMeta.name : "user"}
//         </h5>
//       </div>

//       <div className="chat_body">
// <div className="p-3">
//   {chatHistory.map((chat)=>(
//       <div className="m-1  bg-danger-subtle">
//         <p>{chat.content}</p>
//       </div>
//   ))}
  
// </div>

//       </div>
//       <div className="d-flex justify-content-center ">
//         <FormGroup className="d-flex gap-3 m-4 ">
//           <FormControl
//             value={message}
//             onChange={(e) => {
//               setMessage(e.target.value);
//             }}
//             onKeyPress={(e) => {
//               e.key == "Enter" && sendMessage();
//             }}
//             placeholder="type your message"
//             className="w-75 xl"
//           ></FormControl>
//           <Button disabled={!message} onClick={()=>{
//             sendMessage();
//             setloader(!loader)
//           }}>
//             Send
//           </Button>
//         </FormGroup>
//       </div>

//       {/* --------------------------------------------- */}

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <FriendsProfile data={{ friendMeta, userData }} />
//         </Modal.Body>
       
//       </Modal>

//       {/* ------------------------------------------------------- */}
//     </div>
//   );
// };

// export default Chat;
