import React, { useEffect, useState } from "react";
import "../assets/styles/ViewRequests.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const ViewRequests = ({ userdata }) => {

  const [requests,setRequests]=useState([])
  // const [rid,setRid]=useState("")
  console.log(userdata._id);
  const viewRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7070/chatapp/${userdata._id}/viewfriendrequest`
      );
      setRequests(response.data)
    } catch (error) {
      console.error("Error fetching friend requests:", error);

    }
  };

  useEffect(() => {
    viewRequests()
  }, [userdata._id])

  console.log("requests :",requests)
  // setRid(requests.friendRequest._id)
  // console.log("requestID:",rid)

  ////////////////////////////////////////////////

  const acceptRequest=async (id)=>{
    try {
      const response=await axios.put(`http://localhost:7070/chatapp/${id}/acceptrequest`)
      console.log("message:",response.data)
    } catch (error) {
      console.log("error in accepting request",error)
    }

  }

  ////////////////////////////////////////////

    const rejectRequest=async (id)=>{
      try {
        const response=await axios.put(`http://localhost:7070/chatapp/${id}/rejectrequest`)
        console.log("request rejected",response)
      } catch (error) {
        console.log("error in rejecting request",error)
      }
    }





 
  return (
    <div className="friendRequest_main">
      <h1>Friend Requests</h1>
      

      {requests.map((response)=>{
          return(
            
            <div key={response._id} className="request_tile">
              <div className="dp"><h1>{response.senderInfo.name.charAt(0)}</h1></div>
              <div className="textbox"><p><span>{response.senderInfo.name}</span> Requested to add you</p></div>
              <div className="btns_holder">
                <Button variant="primary" onClick={()=>acceptRequest(response.friendRequest._id)}>Accept</Button>
                <Button variant="secondary" onClick={()=>rejectRequest(response.friendRequest._id)}>Reject</Button>
              </div>
            <p></p>
            </div>
          )
      })}
    </div>
  );
};

export default ViewRequests;
