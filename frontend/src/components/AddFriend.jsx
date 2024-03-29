import React, { useState } from "react";
import "../assets/styles/AddFriend.css";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";
import { IoPersonRemoveSharp } from "react-icons/io5";

import { FaUser } from "react-icons/fa";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { BASE_URL1 } from "../BaseURL";

const AddFriend = ({ userdata }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState();
  const [showtile, setShowtile] = useState(false);
  const [recieverID, setRecieverID] = useState();
  const [senderID, setsenderID] = useState(userdata._id);
  const [resultStatus, setResultStatus] = useState("");
  const [smShow, setSmShow] = useState(false);
  const [loading, setLoading] = useState(false);


  console.log("recieverID  :", recieverID);
  console.log("senderID :", senderID);
  console.log("user who search : ", userdata);
  console.log(searchInput);

  const searchUser = async () => {
    setLoading(true);
    setSearchInput("");
    setResultStatus("");
    // e.preventDefault();
    try {
      const response = await axios.get(
        `${BASE_URL1}/search/${searchInput}`
      );
      setTimeout(() => {
        setLoading(false);
        setsearchResult(response.data);
        setShowtile(true);
        setRecieverID(response.data._id);
        console.log("search result::", searchResult);
      }, 1300);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setResultStatus("No Results Found !");
        setLoading(false);
      }, 2000);
    }
  };

  const sendRequest = async () => {
    
    setsenderID(userdata._id);
    console.log("senderID:".senderID);
    setRecieverID(searchResult._id);
    console.log("senderID:".senderID);
    try {
      if (senderID !== "" && recieverID !== "") {
        const response = await axios.post(
          `${BASE_URL1}/sendfriendrequest`,
          {
            sender_Id: senderID,
            reciever_Id: recieverID,
            date: new Date(),
          },
        );
        console.log(response);
        setSmShow(!smShow);
      }
    } catch (error) {
      console.log("error in send reques", error.response.data.message);
      alert(error.response.data.message);
    }
  };
  const navigate = useNavigate();

  const unFriend = async () => {
    console.log("Unfriend clicked");

    try {
      const response = await axios.put(
        `${BASE_URL1}/unfriend`,
        {
          requestingId: senderID,
          targetId: recieverID,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/home/search");
  };

  return (
    <div className="addfriend_container">
      <Modal
        variant="secondary"
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Request Sended to {!searchResult ? "" : searchResult.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>You will become friend when Accepted</Modal.Body>
      </Modal>
      <div className="searchHeader">
        <h2>Search For Friends</h2>
      </div>

      <div className="searchBar">
        <InputGroup onSubmit={searchUser} className="mb-3">
          <Form.Control
            placeholder="mobile number"
            type="text"
            onKeyPress={(e) => {
              e.key === "Enter" && searchUser();
            }}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setResultStatus("");
              setShowtile(false);
            }}
          />
        </InputGroup>
        <Button onClick={searchUser} variant="primary">
          <IoSearchSharp size={30} />
        </Button>
      </div>
      {/* ---------------------------------------------------- */}

      <div className="pt-5">
        {" "}
        {loading ? (
          <BarLoader speedMultiplier={1} color="#ab98e9e6" />
        ) : (
          <div></div>
        )}
      </div>
      {showtile ? (
        <div className="userTile">
          <div className="primaryContainer">
            
            {searchResult.profile_photo?(<img  className="userdp" src={`${BASE_URL1}/profile/${searchResult.profile_photo}`} alt="dp" />):(<div className="userdp">
              <FaUser size={30} />
            </div>)}
            <div>
              <div className="px-1 text-lg-start">
                <h4>{searchResult.name}</h4>
              </div>
              <div className="usermeta">
                <p>@{searchResult.mobile}</p>
                <p className="px-3">
                  {searchResult.connections.length} friends
                </p>
              </div>
            </div>
          </div>
          <div></div>
          {senderID !== recieverID ? (
            <div className="btnContainer">
              {!searchResult.connections.includes(senderID) ? (
                <Button onClick={sendRequest}>
                  Add <IoPersonAdd />
                </Button>
              ) : (
                <Button onClick={unFriend} id="unfriendBTN">
                  unfriend <IoPersonRemoveSharp />
                </Button>
              )}
            </div>
          ) : (
            <>self</>
          )}
        </div>
      ) : (
        <div className="noResults">{resultStatus}</div>
      )}
    </div>
  );
};

export default AddFriend;
