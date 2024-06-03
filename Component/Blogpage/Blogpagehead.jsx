import { useState, useEffect } from "react";
import axios from "axios";
function Blogpagehead({ data }) {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("HEY DATA IS HERE:", data);
  const convertStringToArray = (str) => {
    console.log("-----------datas from bloghead: " + data);
    // Step 1: Replace single quotes with double quotes
    let jsonString = str.replace(/'/g, '"');

    // Step 2: Replace spaces between words with commas
    jsonString = jsonString.replace(/"\s+"/g, '","');

    // Step 3: Parse the JSON string to get the array
    const array = JSON.parse(jsonString);
    console.log(array);
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://sport-blog-app-f99d3e95c99d.herokuapp.com/user", {
          headers: {
            Authorization: `token ${token}`, // Add the token to the request headers
          },
        });
        console.log("--------------------");
        console.log(response.data);
        console.log("--------------------");
        console.log("/////////////////////");
        console.log(data);
        console.log("/////////////////////");

        setProfil({
          name: response.data.username,
          email: response.data.email,
          profilePicture: response.data.picture_url,
        });
      } catch (error) {
        console.error("Fetching data failed:", error);
        setError("Fetching profile data failed");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  if (!data) {
    return <div>No blog data available</div>; // Handle case where blog data is null
  }

  return (
    <div className="bloc-head">
      <h2>{data.title}</h2>
      <div className="bloc-img">
        <img src={data.picture_url} alt="" />
      </div>
      <div className="bloc-info">
        <div className="bloc-info-head">
          <div className="bloc-info-author">
            {profil && <img src={profil.profilePicture} alt="Author" />}
            {profil && (
              <h4>
                {data.user == localStorage.getItem("id")
                  ? localStorage.getItem("username")
                  : "user: " + data.user}
              </h4>
            )}
          </div>
          <div className="bloc-info-author">
            <h4>06 may 2024</h4>
          </div>
        </div>
        <div className="bloc-info-foot">
          <ul>
            {convertStringToArray(data.tags).map((el, id) => {
              return (
                <li key={id}>
                  <div className="bloc-info-author">
                    <h4>{el}</h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Blogpagehead;
