import React from "react";
import { Button } from "react-bootstrap";
import "../assets/styles/FriendsProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL1, BASE_URL2 } from "../BaseURL";

const FriendsProfile = ({ data }) => {
  const { friendMeta, userdata } = data;
  const navigate = useNavigate();

  const handleclick = async () => {
    console.log("Unfriend clicked");
    // console.log( userData._id)
    console.log(friendMeta._id);

    try {
      const response = await axios.put(
        `${BASE_URL1}/unfriend`,
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
    <div className="profile_container ">
      <div className="profil_dp d-flex justify-content-center m-3">
        {friendMeta.profile_photo ? (
          <img
            className="dpIMAGE"
            src={`${BASE_URL2}/profile/${friendMeta.profile_photo}`}
            alt="dp"
          />
        ) : (
          <h1 className="bg-primary text-white py-3 px-4 d-flex rounded-5">
            {friendMeta.name.charAt(0)}
          </h1>
        )}
      </div>
      <div>
        <h3>{friendMeta.name}</h3>
      </div>
      <div className="d-flex align-items-center justify-content-center g-3">
        <h4>{friendMeta.connections.length}</h4>
        <span> Connections</span>
      </div>
      <div className="user_profile_meta">
        <span>
          <span>Phone </span>
          <p>{friendMeta.mobile}</p>
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
