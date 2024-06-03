import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useState } from "react";

function Blogpagecontent({ handleClickLike, liked, data }) {
  return (
    <>
      <div className="bloc-content">
        <p>{data.content.replace(/<[^>]*>/g, "")}</p>

        <div className="bloc-content-like">
          <div className="bloc-content-like-img">
            {liked ? (
              <AiFillLike color="blue" size="50" onClick={handleClickLike} />
            ) : (
              <AiFillDislike color="red" size="50" onClick={handleClickLike} />
            )}
          </div>
          <p>1,458 likes</p>
        </div>
      </div>
      <div className="bloc-comments">
        <h2>Comment section</h2>
        <form action="submit">
          <textarea type="text" placeholder="Your comment..." />
        </form>
      </div>
    </>
  );
}

export default Blogpagecontent;
