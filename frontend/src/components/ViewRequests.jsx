import React, { useEffect, useState } from "react";
import "../assets/styles/ViewRequests.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";

const ViewRequests = ({ userdata }) => {
  const [requests, setRequests] = useState([]);
  console.log(userdata._id);
  const viewRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7070/chatapp/${userdata._id}/viewfriendrequest`
        // `http://localhost:7070/chatapp/65b2121512b52d856a77a0f7/viewfriendrequest`
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    viewRequests();
  }, [userdata._id]);

  console.log("requests :", requests);
  // setRid(requests.friendRequest._id)
  // console.log("requestID:",rid)

  ////////////////////////////////////////////////

  const acceptRequest = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:7070/chatapp/${id}/acceptrequest`
      );
      console.log("message:", response.data);
    } catch (error) {
      console.log("error in accepting request", error);
    }
  };

  ////////////////////////////////////////////

  const rejectRequest = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:7070/chatapp/${id}/rejectrequest`
      );
      console.log("request rejected", response);
    } catch (error) {
      console.log("error in rejecting request", error);
    }
  };

  return (
    <div className="friendRequest_main">
      <h1>Friend Requests</h1>
      {requests == 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "180px" }}>
          <h4 style={{ color: "rgba(48, 79, 125, 0.536)" }}>No Requests</h4>{" "}
          <NavLink to="/home/search">find Friends</NavLink>
        </div>
      ) : (
        ""
      )}
      {requests.map((response) => {
        return (
          <div key={response._id} className="requests">
            <div className="reqdp">
              <FaUser size={30} />
            </div>
            <div className="textbox">
              <p>
                <span style={{ fontWeight: "600" }}>
                  {response.senderInfo.name}
                </span>{" "}
                Requested to add you
              </p>
              <a href=""></a>
            </div>
            <div className="btns_holder">
              <Button
                variant="success"
                onClick={() => acceptRequest(response.friendRequest._id)}
              >
                <IoMdPersonAdd size={20} />
              </Button>
              <Button
                variant="danger"
                onClick={() => rejectRequest(response.friendRequest._id)}
              >
                <TiDeleteOutline size={20} />
              </Button>
            </div>
            <p></p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewRequests;
