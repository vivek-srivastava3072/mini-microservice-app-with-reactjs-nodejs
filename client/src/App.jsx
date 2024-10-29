import React from "react";
import CreatePost from "./CreatePost";
import FetchPosts from "./FetchPosts";

export default function App() {
  return (
    <div className="container">
      <CreatePost />
      <FetchPosts />
    </div>
  );
}
