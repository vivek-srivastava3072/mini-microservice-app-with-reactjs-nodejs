const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const comment = posts[postId]?.comments.find(
      (comment) => comment.id === id
    );
    if (comment) {
      comment.status = status;
      comment.content = status === "approved" ? content : "Comment rejected";
    }
  }
};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("RECEIVED events:", type);
  handleEvent(type, data);
  res.status(201).send({});
});

app.listen(4002, async () => {
  console.log("Query Service running on http://localhost:4002");

  try {
    const response = await axios.get("http://localhost:4005/events");
    for (let event of response.data) {
      console.log("Processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.error("Error fetching events:", error.message);
    // Optionally implement a retry mechanism here
  }
});
