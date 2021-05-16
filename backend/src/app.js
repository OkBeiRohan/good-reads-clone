const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", routes);

module.exports = server;
