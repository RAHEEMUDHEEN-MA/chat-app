import React, { useState } from "react";
import "../assets/styles/AddFriend.css";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";

const AddFriend = ({ userdata }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState();
  const [showtile, setShowtile] = useState(false);

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
      console.log("search result", searchResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addfriend_container">
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
              <p>{searchResult.mobile+"8113044223"}</p>
            </div>
          </div>
         </div>
         <div className="btnContainer">
            <Button >send Request</Button>
         </div>
        </div>
      ) : (
        <span>no results</span>
      )}
    </div>
  );
};

export default AddFriend;
