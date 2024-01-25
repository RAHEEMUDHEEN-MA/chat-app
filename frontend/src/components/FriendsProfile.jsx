import React from "react";
import "../assets/styles/FriendsProfile.css";
import { Button } from "react-bootstrap";

const FriendsProfile = (friendMeta) => {
 
  console.log("profile of :",friendMeta.friendMeta.name)
  return (
   
      <div className="profile_container">
        <div className="profil_dp d-flex justify-content-center m-3">
          <h1 className="bg-primary text-white py-3 px-4  d-flex rounded-5" >{friendMeta.friendMeta.name.charAt(0)}</h1>
        </div>
        <div>
          <h3>{friendMeta.friendMeta.name}</h3>
        </div>
        <div className="user_profile_meta">
          <span>
            <span>Phone </span>
            <p>{friendMeta.friendMeta.mobile}</p>
          </span>
          <span>
            <span>email</span>
            <p>{friendMeta.friendMeta.email}</p>
          </span>
        </div>

        <div><Button variant="danger">Unfriend</Button></div>
      </div>
   
  );
};

export default FriendsProfile;
