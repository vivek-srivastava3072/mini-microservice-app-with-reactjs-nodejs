import React, { useState } from "react";
import axios from "axios";

export default function CreateComment({ postId }) {
  const [content, setContent] = useState("");

  const addPost = async () => {
    const resp = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        content,
      }
    );
    console.log(resp);
    setContent("");
  };
  return (
    <div className="fs-6 fw-normal mt-5 d-flex flex-column">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your comment here..."
        className="m-2 px-2"
      />
      <button className="btn btn-info m-2" onClick={addPost}>
        Add Comment
      </button>
    </div>
  );
}
