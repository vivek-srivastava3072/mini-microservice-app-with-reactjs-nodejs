import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import CommentList from "./CommentList";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const resp = await axios.get("http://localhost:4002/posts");

    // Convert the object to an array of posts
    const postsArray = Object.values(resp.data);
    setPosts(postsArray);

    console.log(resp.data, postsArray, "postsArray");
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="container">
      <div>All Posts ({posts.length}):</div>
      <ul className="d-flex flex-wrap m-0 p-0">
        {posts.map((post, idx) => (
          <li
            key={post.id}
            className="list-group-item bg-info-subtle rounded rounded-md col-lg-5 col-md-5 col-sm-12 mt-3 mr-3"
          >
            <div className="text-info rounded fs-5 text-center fw-bold d-flex flex-row align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              <span className="ml-2">{post.title}</span>
            </div>
            <CommentList comments={post.comments} />
            <CreateComment postId={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
