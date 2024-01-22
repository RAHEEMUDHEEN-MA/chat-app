import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../assets/styles/Login.css";
import axios from "axios";
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [authfailed, setAuthfailed] = useState("");

  const LogIn = async () => {
    if (mobile.length === 10 && password !== "") {
      console.log("Submitted", mobile, password);

      try {
        const response = await axios.post(
          "http://localhost:7070/chatapp/login",
          {
            mobile: mobile,
            password: password,
          }
        );

        console.log(response.data);
        alert(response.data.message);
        setAuthfailed("");
        setMobileError("");
      } catch (error) {
        console.error("AxiosError:", error.response);
        if (error.response.status == 401) {
          setAuthfailed(error.response.data.message);
        } else {
          if (error.response.status == 404) {
            setAuthfailed(error.response.data.message);
          }
        }
      }
    } else {
      setMobileError("! Mobile number must contain exactly 10 digits");
    }
  };

  return (
    <div className="login_main ">
      <div className="login_form">
        <Form>
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
            />
          </Form.Group>

          <Form.Group>
            <span style={{ fontSize: "12px", color: "red" }}>{authfailed}</span>
          </Form.Group>

          <Button variant="primary" onClick={LogIn}>
            Submit
          </Button>

          <br />
          <br />

          <a href="/signup">Signup</a>
        </Form>
      </div>
    </div>
  );
};

export default Login;
