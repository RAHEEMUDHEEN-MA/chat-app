import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import io from "socket.io-client";

import "../assets/styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const Login = ({ setuserdata, setSocket }) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [authfailed, setAuthfailed] = useState("");
  const [loading, setLoading] = useState(false);

  //  let date=new Date()
  // date=date.toUTCString()
  //  console.log("currentTimeAndDate 1111111111111111",date)

  const navigate = useNavigate();

  const LogIn = async () => {
    setLoading(true);
    if (mobile.length === 10 && password !== +"") {
      console.log("Submitted", mobile, password);

      try {
        const response = await axios.post(
          "http://localhost:7070/chatapp/login",
          {
            mobile: mobile,
            password: password,
          }
        );

        console.log(response.data.userdata);

        setuserdata(response.data.userdata);
        setAuthfailed("");
        setMobileError("");
        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 700);

        const newsocket = io("http://localhost:7070");
        setSocket(newsocket);
      } catch (error) {
        console.error("AxiosError:", error.response);
        if (error.response.status === 401) {
          setTimeout(() => {
            setLoading(false);
            setAuthfailed(error.response.data.message + " !");
          }, 500);
        } else {
          if (error.response.status === 404) {
            setTimeout(() => {
              setLoading(false);
              setAuthfailed(error.response.data.message + " !");
            }, 500);
          }
        }
      }
    } else {
      setMobileError("! Mobile number must contain exactly 10 digits");
      setLoading(false);
    }
  };

  return (
    <div className="login_main ">
      <Row className="login_main_conatainer">
        <Col className="leftBanner">
          <div>
            <h2>Welcome to ChatApp</h2>
          </div>
          <span className="welcome_underline"></span>
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              at ad illo expedita quia esse! In soluta quasi autem dolorum!
            </p>
          </div>
          <div>
            <Button
              className="rounded-5 border-2  px-4 py-3"
              variant="outline-light"
            >
              Know More
            </Button>
          </div>
        </Col>

        <Col className="login_form">
          <Form>
            <div className="loginheaderholder">
              <h2>Login</h2>
              <div className="login_underline"></div>
            </div>

            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Control
                type="mobile"
                placeholder="Enter Mobile No "
                pattern="[0-9]{10}"
                required
                onChange={(e) => {
                  setMobile(e.target.value);
                  setMobileError("");
                }}
                onKeyPress={(e) => {
                  e.key === "Enter" && LogIn();
                }}
              />
              <span className="error_message">{mobileError}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyPress={(e) => {
                  e.key === "Enter" && LogIn();
                }}
              />
            </Form.Group>

            <Form.Group>
              <span style={{ fontSize: "12px", color: "red" }}>
                {authfailed}
              </span>
            </Form.Group>

            <Button
              className="login_button rounded-5  px-4 py-3 "
              style={{ width: "220px" }}
              variant="primary"
              onClick={LogIn}
            >
              {loading ? <ClipLoader size={"20"} color="white" /> : "LOGIN"}
            </Button>

            <br />
            <br />

            <a href="/signup">Signup</a>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
