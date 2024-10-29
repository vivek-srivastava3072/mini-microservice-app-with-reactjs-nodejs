const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    // Reject the comment if it includes
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: { id, content, postId, status: status },
    });
  }

  res.status(201).send({});
});

app.listen(4003, () => {
  console.log("Moderation Service running on http://localhost:4003");
});
