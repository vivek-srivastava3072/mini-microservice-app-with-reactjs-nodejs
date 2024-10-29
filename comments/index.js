const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const commentsByPostId = {};

// app.get("/posts/:id/comments", (req, res) => {
//   res.status(200).send(commentsByPostId[req.params.id]);
// });

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;

  const respComm = await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: content,
      postId: postId,
      status: "pending",
    },
  });
  // console.log(respComm, "respComm");

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("RECEIVED events:", type);

  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id: id,
        content: content,
        postId: postId,
        status: status,
      },
    });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Comments server running on http://localhost:4001");
});
