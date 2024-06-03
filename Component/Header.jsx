
import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { SearchContext } from "../src/SearchValue"; // Import the context
import "./Header.css";
import searchIcon from "../public/icon-loupe-white.svg"; // Import the search icon

function Header() {
  const [close, setClose] = useState(false);
  const handleClick = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  const { setSearchValue } = useContext(SearchContext); // Use the context
  const [inputvalue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(inputvalue);
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home or login page
  };
  return (
    <div
      className="header"
      /*style={{ height: isHeaderVisible ? "100vh" : "10vh" }}*/
    >
      <div
        className="header-nav"
        /*style={{ height: isHeaderVisible ? "60vh" : "10vh" }}*/
      >
        <h1
          id="title"
          /*style={{
            cursor: "pointer",
          }}
          onClick={handleClick}*/
        >
          Sport-Blog
        </h1>
        <nav /*style={{ display: isHeaderVisible ? "block" : "none" }}*/>
          <ul className="header-category">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/BlogPage">Tags</Link>
            </li> */}
            <li>
              <Link to="/profile">Profil</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="header-right"
        /*style={{ display: isHeaderVisible ? "block" : "none" }}*/
      >
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Chearch by Tags..."
            value={inputvalue}
            onChange={handleChangeInput}
          />
          <img src="../public/icon-loupe-white.svg" alt="" />
        </form>
        {!isLoggedIn ? (
          <>
            <Link to={"/register"} className="button">
              Register
            </Link>
            <Link to={"/login"} className="button">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
