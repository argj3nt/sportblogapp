import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Blogpage/Blogpage.css";

function Latest() {
  const navigate = useNavigate();
  const handleClick = (id) => {
    if (id) {
      console.log(id); // Log the id directly
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/blog/${id}`);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://sport-blog-app-f99d3e95c99d.herokuapp.com/");
        setData(response.data);
      } catch (error) {
        console.error("Fetching data failed:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bloc-latest">
      <h2>Latest</h2>
      <div className="latest-caroussel">
        {data.map((el) => {
          return (
            <div
              key={el.id}
              id={el.id}
              onClick={() => handleClick(el.id)}
              className="caroussel-card"
            >
              <div className="card-img">
                <img src={el.picture_url} alt="" />
              </div>
              <h3>{el.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Latest;
