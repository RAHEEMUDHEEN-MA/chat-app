import React, { useEffect, useState } from "react";
import "../assets/styles/ViewRequests.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { BASE_URL1, BASE_URL2 } from "../BaseURL";

const ViewRequests = ({ userdata }) => {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState(false);
 


 
  useEffect(() => {
    const viewRequests = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL1}/${userdata._id}/viewfriendrequest`
          
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
  

    viewRequests();
  }, [userdata, requests]);



  const acceptRequest = async (id) => {
    try {
      await axios.put(
        `${BASE_URL1}/${id}/acceptrequest`
      );
 
      setAccepted(true);
    } catch (error) {
      console.log("error in accepting request", error);
    }
  };

  ////////////////////////////////////////////

  const rejectRequest = async (id) => {
    try {
      const response = await axios.put(
        `${BASE_URL1}/${id}/rejectrequest`
      );
      console.log("request rejected", response);
    } catch (error) {
      console.log("error in rejecting request", error);
    }
  };

  return (
    <div className="friendRequest_main">
      {/* <img
       src="https://cdni.iconscout.com/illustration/premium/thumb/react-native-mobile-app-6578313-5501855.png"
    alt=""
  />; */}
      <h1>Friend Requests</h1> 
      {requests === 0 ? (
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
            

          {response.senderInfo.profile_photo?( <img  className="reqdp" src={`${BASE_URL2}/profile/${response.senderInfo.profile_photo}`} alt="profile" /> ):(<div className="reqdp">
              <FaUser size={30} />
            </div>)}

            <div className="textbox">
              <p>
                <span style={{ fontWeight: "600" }}>
                  {response.senderInfo.name}
                </span>{" "}
                Requested to add you
              </p>
             
            </div>
            <div className="btns_holder">
            <Button
  variant="success"
  disabled={accepted}
  onClick={() => acceptRequest(response.friendRequest._id)}
>
  {accepted ? "Accepted" : <IoMdPersonAdd  size={20} />}
</Button>

              {!accepted ? (
                <Button
                  variant="danger"
                  onClick={() => rejectRequest(response.friendRequest._id)}
                >
                  <TiDeleteOutline size={20} />
                </Button>
              ) : (
                <></>
              )}
            </div>
            <p></p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewRequests;
