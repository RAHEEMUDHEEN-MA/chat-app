import React, { useState } from "react";
import "../assets/styles/AddFriend.css";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import axios from "axios";

const AddFriend = ({ userdata }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState();
  const [showtile, setShowtile] = useState(false);
  const [recieverID, setRecieverID] = useState();
  const [senderID, setsenderID] = useState();
  console.log("recieverID  :", recieverID);
  console.log("senderID :", senderID);

  const [smShow, setSmShow] = useState(false);

  console.log("user who search : ", userdata);

  console.log(searchInput);

  const searchUser = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:7070/chatapp/search/${searchInput}`
      );
      // console.log(response.data)
      setsearchResult(response.data);
      setShowtile(!showtile);
      setRecieverID(searchResult._id);
      console.log("search result", searchResult);
    } catch (error) {
      console.log(error);
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
          "http://localhost:7070/chatapp/sendfriendrequest",
          {
            sender_Id: senderID,
            reciever_Id: recieverID,
            date: new Date(),
          }
        );
        console.log(response);
        setSmShow(!smShow)
      }
    } catch (error) {
      console.log("error in send reques",error)
    }
  };

  return (
    <div className="addfriend_container">
      <Modal variant="secondary"
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
          Request Sended to {!searchResult?"":searchResult.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>You will become friend when Accepted</Modal.Body>
      </Modal>
     

      <div className="searchBar">
        <InputGroup onSubmit={searchUser} className="mb-3">
          <Form.Control
            placeholder="mobile number"
            type="text"
            onKeyPress={(e) => {
              e.key == "Enter" && searchUser();
            }}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <Button onClick={searchUser} variant="primary">
            Search
          </Button>
        </InputGroup>
      </div>

      {showtile ? (
        <div className="userTile">
          <div className="user">
            <div className="userdp">
              <h1>{searchResult.name.charAt(0)}</h1>
            </div>
            <div className="usermeta">
              <div>
                <h4>{searchResult.name}</h4>
              </div>
              <div>
                <p>{searchResult.mobile}</p>
                <p>{searchResult._id}</p>
              </div>
            </div>
          </div>
          <div className="btnContainer">
            <Button onClick={sendRequest}>send Request</Button>
          </div>
        </div>
      ) : (
        <span>no results</span>
      )}
    </div>
  );
};

export default AddFriend;
