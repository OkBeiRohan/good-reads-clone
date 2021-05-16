const app = require("./app");
const config = require("./config");

/********* 
 * Start the server on the port defined in the env
*/

app.listen(config.port, () =>
  console.log(
    `Server is up and running in ${config.mode} mode on http://localhost:${config.port}/ `
  )
);
