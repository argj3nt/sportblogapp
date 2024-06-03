import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useContext } from "react";
import Header from "../Component/Header";
import Blogpage from "../Component/Blogpage/Blogpage";
import Home from "../Component/Home/Home";
import Login from "./components/Login/Login";
import Categorys from "../Component/Home/Categorys";
import Register from "./components/Register/Register";
import Latest from "../Component/Latest";
import BlogPost from "./components/BlogPost/BlogPost";
import { SearchProvider } from "./SearchValue"; // Import the SearchProvider
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <>
      <SearchProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogpost" element={<BlogPost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog/:id" element={<Blogpage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </>
  );
};

export default App;
