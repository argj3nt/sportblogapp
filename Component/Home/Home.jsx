import "./Home.css";
import Categorys from "./Categorys";
import Latest from "../Latest";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../src/SearchValue"; // Import the context

// ErrorBoundary component to catch errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

function Home() {
  const [data, setData] = useState([]);
  const [ownblogs, setOwnBlogs] = useState(null);
  const [footb, setFootb] = useState(null);
  const [basketb, setBasketb] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);

  const { searchValue } = useContext(SearchContext); // Use the context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://sport-blog-app-f99d3e95c99d.herokuapp.com/");
        console.log(response.data); // Handle success response
        setData(response.data);
      } catch (error) {
        console.error("Fetching data failed:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    let l = null;
    try {
      console.log("Data before filtering:", data);
      const userId = localStorage.getItem("id");
      console.log("User ID:", userId);
      if (data.length > 0) {
        l = data.filter((item) => item.user == userId);
      }
      console.log("Filtered data:", l);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
    return l;
  };
  const filterDataByTags = (name) => {
    let filteredData = [];
    try {
      console.log("Data before filtering:", data);
      if (data.length > 0) {
        filteredData = data.filter((item) => {
          // Check if item.tags is a string representing an array
          if (typeof item.tags === "string" && item.tags.startsWith("[")) {
            // Replace single quotes with double quotes
            const correctedTagsString = item.tags.replace(/'/g, '"');
            // Parse the corrected string into an array
            const tagsArray = JSON.parse(correctedTagsString);
            // Check if the parsed tagsArray is an array
            if (Array.isArray(tagsArray)) {
              return tagsArray.some(
                (tag) =>
                  typeof tag === "string" &&
                  tag.toLowerCase().includes(name.toLowerCase())
              );
            }
          } else if (Array.isArray(item.tags)) {
            return item.tags.some(
              (tag) =>
                typeof tag === "string" &&
                tag.toLowerCase().includes(name.toLowerCase())
            );
          }
          // If item.tags is neither a string nor an array, return false
          return false;
        });
      }
      console.log("Filtered data after by tags:", filteredData);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
    return filteredData;
  };

  useEffect(() => {
    console.log("-------------------------------------");
    const foot = filterDataByTags("football");
    const basket = filterDataByTags("basketball");
    setFootb(foot);
    setBasketb(basket);
    const n = filterData();
    setOwnBlogs(n);
    console.log("Updated ownblogs:", ownblogs);
  }, [data]);

  useEffect(() => {
    if (searchValue) {
      const filtered = filterDataByTags(searchValue);
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(null);
    }
  }, [searchValue, data]);
  return (
    <ErrorBoundary>
      <div className="home">
        {searchValue && filteredBlogs !== null ? (
          <Categorys
            name={`Search results for "${searchValue}"`}
            data={filteredBlogs}
          />
        ) : (
          <>
            {ownblogs !== null && (
              <Categorys name={"My blogs"} data={ownblogs} />
            )}
            {footb !== null && (
              <Categorys name={"Football"} data={footb} reverse={true} />
            )}
            {basketb !== null && (
              <Categorys name={"Basketball"} data={basketb} />
            )}
          </>
        )}

        {/* <Categorys name="Basket" data={data} />
        <Categorys name="Football" reverse={true} data={data} />
        <Categorys name="Tennis" data={data} /> */}
        <Latest />
      </div>
    </ErrorBoundary>
  );
}

export default Home;
