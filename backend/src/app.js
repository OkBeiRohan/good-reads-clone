/*******
 * ExpressJs Library
 * It is a backend framework for NodeJs for APIs
 */
const express = require("express");

/*******
 * CORS is known as Cross-Origin Resource Sharing.
 * Used to configure Express to add headers stating that your API accepts requests coming from other origins.
 */
const cors = require("cors");

/*******
 * Morgan is used to log all requests to API in server console
 */
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
