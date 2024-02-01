import React from "react";
import { Button } from "react-bootstrap";
import "../assets/styles/FriendsProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FriendsProfile = ({ data }) => {
  const { friendMeta, userdata } = data;
  const navigate = useNavigate();

  console.log("User At profile", userdata);
  console.log("friend At profile", friendMeta);

  const handleclick = async () => {
    console.log("Unfriend clicked");
    // console.log( userData._id)
      console.log(friendMeta._id)

    try {
      const response = await axios.put(
        "http://localhost:7070/chatapp/unfriend",
        {
          requestingId: userdata._id,
          targetId: friendMeta._id,
        }
      );
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/home/chat");
  };


  return (
    <div className="profile_container">
      <div className="profil_dp d-flex justify-content-center m-3">
        <h1 className="bg-primary text-white py-3 px-4 d-flex rounded-5">
          {friendMeta.name.charAt(0)}
        </h1>
      </div>
      <div>
        <h3>{friendMeta.name}</h3>
      </div>
      <h4>{friendMeta.connections.length}</h4>
      <div className="user_profile_meta">
        <span>
          <span>Phone </span>
          <p>
            {friendMeta.mobile} <span>friends</span>
          </p>
        </span>
        <span>
          <span>Email</span>
          <p>{friendMeta.email}</p>
        </span>
      </div>

      <div>
        {/* Additional logging to check if the Button renders */}
        <Button onClick={handleclick} variant="danger">
          Unfriend
        </Button>
      </div>
    </div>
  );
};

export default FriendsProfile;
