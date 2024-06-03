import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your validation and login logic here
    try {
      const response = await axios.post(
        "https://sport-blog-app-f99d3e95c99d.herokuapp.com/register",
        { email, username, password }
      );
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="main">
        <div className="whitecontainerregister">
          <h1>Register</h1>
          <div className="gtsya">
            Discover our best plans to post your daily blogs and become famous
            with us!
          </div>
          <div className="input-container">
            <p className="infos">Your email</p>
            <input
              className="ourinfo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
          </div>
          <div className="input-container">
            <p className="infos">Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-container">
            <p className="infos">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button className="submitbutton" type="submit">
            Register
            <FontAwesomeIcon icon={faArrowRightToBracket} className="icon" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
