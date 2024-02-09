import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../assets/styles/UserProfile.css";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";


const UserProfile = (userdata) => {
 
  const [profile, setprofile] = useState([]);

  const [name, setname] = useState();

  const [email, setemail] = useState();

  const [image, setimage] = useState();
  console.log(image);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resposnse = await axios.get(
          `http://localhost:7070/chatapp/find/${userdata.userdata._id}`
        );
        setprofile(resposnse.data);
        setname(resposnse.data.name);
        setemail(resposnse.data.email);
        console.log(profile);
      } catch (error) {}
    };
    fetchProfile();
  }, [userdata]);

  ////////////////////////
  const token = JSON.parse(localStorage.getItem("token"));
  //////////////////////////

  const UploadImage = () => {
   if (!image) {
    return
   }else{
    const profile_photo = new FormData();
    profile_photo.append("file", image);
    profile_photo.append("userID", userdata.userdata._id);
    axios
      .post("http://localhost:7070/chatapp/upload", profile_photo)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    console.log("profilee", profile_photo);
   }
  };

  const handleEditClick = () => {
    document.getElementById("profilePictureInput").click();
  };

  const handleSave = () => {
    saveChanges();
    UploadImage();
  };

  const saveChanges = () => {
    try {
      if (name !== "" && email !== "") {
        axios.put(
          `http://localhost:7070/chatapp/editprofile`,
          {
            _id: userdata.userdata._id,
            name: name,
            email: email,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("done");
      } else {
        console.log("not updated");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status == 401) {
        setTokenError(error.response.data.message);
      }
    }
  };

  return (
    <div className="editProfileMain">
      <Modal show={tokenError != null}>
        <Modal.Header>
          <Modal.Title>Token Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Token is expired in this section.Please login again to coutinue the
          seection
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Link to={"/"}>
            <Button variant="primary">Login</Button>
          </Link>
        </Modal.Footer>
      </Modal>

      <div className="profileFormHeader">
        <h4>Edit Profile</h4>
      </div>
      <Form className="profileForm ">
        <div className="profilePicture pt-4">
          {/* <div className="profileDP">N</div> */}
          {profile.profile_photo?( <img
            className="profileDP"
            src={`http://localhost:7070/profile/${profile.profile_photo}`}
            alt="profile"
          />):( <p  className="profileDP " style={{fontSize:"14px", objectFit:"cover", backgroundColor:"gray"}}>upload a  photo <br /> <MdFileUpload />
          </p> )}
         
          <Button className="DpEditBTN" onClick={handleEditClick}>
            <MdEdit />
          </Button>
          {/* Replace Button with a custom button */}
          <input
            type="file"
            id="profilePictureInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
          />
        </div>
        <div className="formInputs">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="d-flex text-black-50">
              Display Name
            </Form.Label>
            <Form.Control
              defaultValue={name}
              type="text"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-flex text-black-50">Phone</Form.Label>
            <Form.Control disabled defaultValue={profile.mobile} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="d-flex text-black-50">Email</Form.Label>
            <Form.Control
              defaultValue={email}
              type="email"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" className="saveBTNN" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserProfile;
