import axios from "axios";
import React, { useState } from "react";
import "../assets/styles/Login.css";
// import signupillustration from "../assets/"
// const signupillustration = require("./undrawSignupn6im.png");
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  ClipLoader} from "react-spinners";
import {  BASE_URL1 } from "../BaseURL";

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
  console.log(notFilled)
  const [showPassword, setShowPassword] = useState(false);
  const [mobileAlreadyusedAlert, setMobileAlreadyusedAlert] = useState("");
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)

  const handleGenderChange = (value) => {
    setGender(value);
  
  };

  const handleSignUp = async (e) => {
    setLoading(true);
    // setLoading(false)
    e.preventDefault();
    

    if (password !== confirmPassword) {
      
      setTimeout(() => {
        setNonMatchAlert("Passwords do not match.");
        setLoading(false);
      }, 500);
    } else {
      setNonMatchAlert("");

      if (name && email && gender && dob && mobile && password) {
        console.log("Submitted", name, email, gender, dob, mobile, password);
        // API call

        try {
          const response = await axios.post(
            `${BASE_URL1}/signup`,
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

          // alert(response.status, "Registration Success");
          setMobileAlreadyusedAlert("");
          setTimeout(() => {
            setLoading(false);
            navigate(-1);
          }, 700);
          
        } catch (error) {
          setTimeout(() => {
            setMobileAlreadyusedAlert(error.response.data.error);
            setLoading(false)
          }, 500);
          
        }
      } else {
        setNotFilled("Please fill in all required fields.");
      }
    }
  };

  return (
    <div className="login_main">  
      <Row className="signup_main_conatainer">
        <Col md={4} className="signupLeftbanner">
          <div>
            <h3>Register with ChatApp</h3>
          </div>
          <span className="welcome_underline"></span>
          <div>
            <p>
              Note : Mobile Number used for Registration will be required to
              login
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
        <Col className="inputsholder">
          <Form onSubmit={handleSignUp}>
            <Row className="signUPform" >
              <Col>
                <Form.Group className="mb-3">
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

                <Form.Group className=" genderGroup" style={{ width: "100px" }}>
                  <div className="d-flex">
                    {/* <label htmlFor="male">male</label> */}
                    <input
                      type="radio"
                      // label="Male"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={() => handleGenderChange("male")}
                    />
                    {"male "}
                  </div>

                  <div className="d-flex">
                    {/* <label htmlFor="female">female</label> */}
                    <input
                      type="radio"
                      // label="Female"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={() => handleGenderChange("female")}
                    />{" "}
                    {"female "}
                  </div>

                  <div className="d-flex">
                    {/* <label htmlFor="other">other</label> */}
                    <input
                      type="radio"
                      // label="Other"
                      id="other"
                      name="gender"
                      value="other"
                      onChange={() => handleGenderChange("other")}
                    />
                    {"other "}
                  </div>
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
                    {/* <p>date of birth</p> */}
                  </div>
                  <Form.Control
                  className="mt-4"
                    type="date"
                    title="date of birth"
                    required
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* ---------------------------------------- */}
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
                  <Form.FloatingLabel
                    style={{ fontSize: "13px", color: "red" }}
                  >
                    {mobileAlreadyusedAlert}
                  </Form.FloatingLabel>
                </Form.Group>
                {/* <Form.Group className="" style={{padding:"0px", margin:"5px 0px"}}>
            <span style={{ fontSize: "14px", color: "red" }}></span>
          </Form.Group> */}
                <Form.Group className="mb-3 d-flex">
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
                    {showPassword ? "Hide" : "Show"} 
                  </Button>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Form.FloatingLabel
                    style={{ fontSize: "13px", color: "orange" }}
                  >
                    {nonMatchAlert}
                  </Form.FloatingLabel>
                </Form.Group>
               
              </Col>
              <div> <Button className="login_button rounded-5  px-5 py-3 " style={{ width: "220px" }} type="submit" variant="primary">
              {loading ? <ClipLoader size={"20"} color="white" /> : "Sign Up"}
                </Button>
                <br />
                <br />
                <a href="/">Login</a></div>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
