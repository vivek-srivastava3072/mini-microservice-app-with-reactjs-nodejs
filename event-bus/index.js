const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = []; // To keep track of all events ever occurred

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  const services = [
    "http://localhost:4000/events", // POSTS
    "http://localhost:4001/events", // COMMENTS
    "http://localhost:4002/events", // QUERY SERVICE
    "http://localhost:4003/events", // MODERATION SERVICE
  ];

  const promises = services.map(async (service) => {
    try {
      await axios.post(service, event);
    } catch (error) {
      console.log(`Error sending event to ${service}: ${error.message}`);
      // Alternatively we can implement a retry mechanism here
    }
  });

  await Promise.all(promises);
  res.status(201).send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("EVENT BUS server running on http://localhost:4005");
});
