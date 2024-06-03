import React, { useState } from "react";
import "./Profile.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faNewspaper,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  // Example profile information
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `token ${token}`, // Add the token to the request headers
          },
        });
        setData({
          name: response.data.username,
          email: response.data.email,
          profilePicture: response.data.picture_url,
        });
      } catch (error) {
        console.error("Fetching data failed:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashcontainer">
      <div className="content-container">
        <div className="leftsidebar">
          <div className="sidebar-content">
            <h1>Dashboard</h1>
            <Link to="/profile" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="icon" />
              Profile
            </Link>
            <br />
            <Link to="/blogpost" className="sidebar-link">
              <FontAwesomeIcon icon={faNewspaper} className="icon" />
              Blog
            </Link>
            <br />
          </div>
          <div className="logout-container">
            <Link to="/logout" className="logoutlink">
              Log out
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="icon"
              />
            </Link>
          </div>
        </div>
        <div className="rightsidecontainer">
          <div className="profile-container">
            <h2 className="profile-heading">Profile</h2>
            <div className="profile-info">
              <div className="profile-details">
                <p className="prousername">
                  <strong>Username:</strong> {data.name}
                </p>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
              </div>
              <div className="profile-picture">
                <img src={data.profilePicture} />
              </div>
            </div>
            {/* Add options to edit profile, change password, etc. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
