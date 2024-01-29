import axios from "axios";
import React, { useState } from "react";
import "../assets/styles/Login.css";
// import signupillustration from "../assets/"
// const signupillustration = require("./undrawSignupn6im.png");
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nonMatchAlert, setNonMatchAlert] = useState("");
  const [notFilled, setNotFilled] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mobileAlreadyusedAlert, setMobileAlreadyusedAlert] = useState("");
  const navigate = useNavigate();

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNonMatchAlert("Passwords do not match.");
    } else {
      setNonMatchAlert("");

      if (name && email && gender && dob && mobile && password) {
        console.log("Submitted", name, email, gender, dob, mobile, password);
        // API call

        try {
          const response = await axios.post(
            "http://localhost:7070/chatapp/signup",
            {
              name,
              email,
              dob,
              gender,
              mobile,
              password,
            }
          );
          console.log(response);

          alert(response.status, "Registration Success");
          setMobileAlreadyusedAlert("");
          navigate(-1);
        } catch (error) {
          setMobileAlreadyusedAlert(error.response.data.error);
          console.log(error.response.data.error);
        }
      } else {
        setNotFilled("Please fill in all required fields.");
      }
    }
  };

  return (
    <div className="login_main">
      <Row className="login_main_conatainer">
        <Col md={4} className="signupLeftbanner" >
        <div>
            <h3>Register with ChatX</h3>
          </div>
          <span className="welcome_underline"></span>
          <div>
            <p>
              Note : Mobile Number used for Registration will be required to login
            </p>
          </div>
          <div>
            <img src="./" alt="" />
            {/* <Button
              className="rounded-5 border-2  px-4 py-3"
              variant="outline-light"
            >
              Login
            </Button> */}
          </div>
        </Col>
        <Col><Form onSubmit={handleSignUp}>
          
          <Row className="login_form">
          <Col><Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ width: "100px" }}>
            <Form.Check
              type="radio"
              label="Male"
              id="male"
              name="gender"
              value="male"
              onChange={() => handleGenderChange("male")}
            />
            <Form.Check
              type="radio"
              label="Female"
              id="female"
              name="gender"
              value="female"
              onChange={() => handleGenderChange("female")}
            />
            <Form.Check
              type="radio"
              label="Other"
              id="other"
              name="gender"
              value="other"
              onChange={() => handleGenderChange("other")}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                fontSize: "13px",
                marginBottom: "-7px",
                marginLeft: "5px",
              }}
            >
              <p>date of birth</p>
            </div>
            <Form.Control
              type="date"
              title="date of birth"
              required
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group></Col>
          <Col>
            {" "}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Mobile"
                pattern="[0-9]{10}"
                title=" Must contain 10 digits"
                required
                onChange={(e) => setMobile(e.target.value)}
              />
              <Form.FloatingLabel style={{ fontSize: "13px", color: "red" }}>
                {mobileAlreadyusedAlert}
              </Form.FloatingLabel>
            </Form.Group>
            {/* <Form.Group className="" style={{padding:"0px", margin:"5px 0px"}}>
            <span style={{ fontSize: "14px", color: "red" }}></span>
          </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?!.*\s).*"
                title="Password must contain at least one number, one letter, and one special character."
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="link"
                onClick={() => setShowPassword(!showPassword)}
                style={{ marginLeft: "5px" }}
              >
                {showPassword ? "Hide" : "Show"} Password
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Form.FloatingLabel style={{ fontSize: "13px", color: "orange" }}>
                {nonMatchAlert}
              </Form.FloatingLabel>
            </Form.Group>
            <Button type="submit" variant="primary">
              Signup
            </Button>
            <br />
            <br />
            <a href="/">Login</a>
          </Col>
          </Row>
         
        </Form></Col>
      </Row>
    </div>
  );
};

export default SignUp;
