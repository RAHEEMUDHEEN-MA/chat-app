import React from "react";
import "../assets/styles/FriendsProfile.css";
import { Button } from "react-bootstrap";

const FriendsProfile = () => {
  return (
    <div className="profile_main_div">
      <div className="profile_container">
        <div className="d-flex justify-content-end"><Button variant="outline-secondary">X</Button></div>
        <div className="profil_dp d-flex justify-content-center m-3">
          <h1 className="bg-primary text-white py-3 px-4  d-flex rounded-5" >R</h1>
        </div>
        <div>
          <h3>USER</h3>
        </div>
        <div className="user_profile_meta">
          <span>
            <span>Phone</span>
            <p>8113044223</p>
          </span>
          <span>
            <span>email</span>
            <p>raheemudheenma@gamil.com</p>
          </span>
        </div>

        <div><Button variant="danger">Unfriend</Button></div>
      </div>
    </div>
  );
};

export default FriendsProfile;
