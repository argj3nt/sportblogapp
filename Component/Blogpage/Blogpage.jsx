import "./Blogpage.css";
import Latest from "../Latest";
import Header from "../Header";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Blogpagehead from "./Blogpagehead";
import Blogpagecontent from "./Blogpagecontent";
import { useParams, useNavigate } from "react-router-dom";

function Blogpage() {
  const [liked, setLiked] = useState(false);
  const handleClickLike = () => {
    setLiked(!liked);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const [currentUser, setCurrentUser] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!id) {
        console.error("No ID provided"); // Log if ID is missing
        return;
      }
      try {
        const response = await axios.get(`https://sport-blog-app-f99d3e95c99d.herokuapp.com/blog/${id}`, {
          headers: {
            Authorization: `token ${token}`, // Add the token to the request headers
          },
        });
        setCurrentUser(response.data);
        console.log("Response:", response); // Log the entire response object
        console.log("Data:", response.data);
        setData(response.data[0]);
      } catch (error) {
        console.error("Fetching data failed:", error);
        setError("Fetching data failed");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, [id]);

  const handleModify = () => {
    navigate(`/blogpost`, { state: { blogData: data } });
  };

  const handleRemove = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/blog/${id}/delete`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      navigate("/"); // Redirect to home or any other page after deletion
    } catch (error) {
      console.error("Failed to delete blog post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  if (!data) {
    return <div>No data available</div>; // Handle case where data is null
  }

  const isOwner = localStorage.getItem("id") == data.user; // Adjust this condition based on your data structure

  // // Memoize the data transformation (if any)
  // const memoizedData = useMemo(() => {
  //   // Perform any data transformations here if needed
  //   // For example: return data.items || some default value
  //   console.log(data);
  //   return data;
  // }, [data]);

  return (
    <>
      <div className="blogpage-bloc">
        <Blogpagehead data={data} />
        {isOwner && (
          <div className="container-spec-but">
            <button className="spec-but" onClick={handleModify}>
              Modify
            </button>
            <button className="spec-but" onClick={handleRemove}>
              Remove
            </button>
          </div>
        )}

        <Blogpagecontent
          data={data}
          handleClickLike={handleClickLike}
          liked={liked}
        />
        <Latest />
      </div>
    </>
  );
}

export default Blogpage;
