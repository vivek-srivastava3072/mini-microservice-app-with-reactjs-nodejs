import React, { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");

  const addPost = async () => {
    if (!title) return;

    const resp = await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
    console.log(resp);
  };
  return (
    <div className="bg-primary-subtle d-flex flex-column p-2 mt-2 rounded">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your title here..."
        className="m-2 px-2"
      />
      <button
        className="btn btn-primary m-2"
        onClick={addPost}
        disabled={title.length <= 0}
      >
        Add Title
      </button>
    </div>
  );
}
