import React from "react";
import { Button, Form } from "react-bootstrap";
import "../assets/styles/UserProfile.css";
import { MdEdit } from "react-icons/md";

const UserProfile = () => {
  return (
    <div className="editProfileMain">
      <div className="profileFormHeader">
        <h4>Edit Profile</h4>
      </div> 
      <Form className="profileForm ">
        <div className="profilePicture pt-4">
          <div className="profileDP">N</div>
          <button className="DpEditBTN">
            <MdEdit />
          </button>
        </div>
        <div className="formInputs">
          <Form.Control
            className="profileInputField"
            type="text"
            placeholder="Profile Name"
          />
          <Form.Control
            className="profileInputField"
            type="text"
            placeholder="Mobile"
          />
          <Form.Control
            className="profileInputField"
            type="email"
            placeholder="Email"
          />
          <Form.Control
            className="profileInputField"
            type="email"
            placeholder="password"
          />
        </div>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
