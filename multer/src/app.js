require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/post", postRoutes);

module.exports = app;
