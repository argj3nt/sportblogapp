import React, { useState, useEffect } from "react";
import "./BlogPost.css";
import { Link, useLocation } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faNewspaper,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";

const BlogPost = () => {
  const location = useLocation();
  const blogData = location.state?.blogData;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const convertTagsToString = (tagsString) => {
    // Convert the tags string to an array
    const tagsArray = JSON.parse(tagsString.replace(/'/g, '"'));
    // Join the array elements with a space
    return tagsArray.join(" ");
  };

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setTags(convertTagsToString(blogData.tags));
      setDescription(blogData.content);
    }
  }, [blogData]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleDescriptionChange = (model) => {
    setDescription(model);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !tags || !description || !file) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("content", description);
    formData.append("picture_url", file);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const token = localStorage.getItem("token");
    try {
      let response = null;
      if (blogData) {
        // Edit existing blog post
        response = await axios.patch(
          `/api/blog/${blogData.id}/update`,
          formData,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        console.log("Blog post updated successfully");
      } else {
        // Create new blog post
        response = await axios.post("/api/blog", formData, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        console.log("Blog post created successfully");
      }

      console.log("Blog post created successfully:", response.data);
      // Reset form fields
      setTitle("");
      setTags("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error("There was an error creating the blog post!", error);
    }
  };

  return (
    <div className="dashcontainer">
      <div className="content-container">
        <div className="leftsidebar">
          <div className="sidebar-content">
            <h1>Dashboard</h1>
            <div className="separator-container">
              <hr className="separator" />
            </div>
            <Link to="/profile" className="sidebar-link">
              <FontAwesomeIcon icon={faUser} className="icon" />
              Profile
            </Link>
            <br></br>
            <Link to="/blogpost" className="sidebar-link">
              <FontAwesomeIcon icon={faNewspaper} className="icon" />
              Blog
            </Link>
            <br></br>
            <Link to="/settings" className="sidebar-link">
              <FontAwesomeIcon icon={faGear} className="icon" />
              Settings
            </Link>
            <br></br>
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
          <h2 className="canp">
            {blogData ? "Edit your post" : "Create a new post"}
          </h2>
          <h3 className="tt">Title:</h3>
          <input
            className="title-textarea"
            placeholder="Enter title here..."
            value={title}
            onChange={handleTitleChange}
          />
          <h3 className="cyi">Tags (separated by a space):</h3>
          <input
            className="tags-input"
            placeholder="Enter tags here..."
            value={tags}
            onChange={handleTagsChange}
          />
          <h3 className="cyi">Choose your image</h3>
          <input type="file" onChange={handleFileChange} />
          <h3 className="tt">Write your description:</h3>
          <div id="editor">
            <FroalaEditorComponent
              tag="textarea"
              model={description}
              onModelChange={handleDescriptionChange}
            />
            <button type="submit" onClick={handleSubmit} className="syp">
              {blogData ? "Update your post" : "Submit your post!"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
