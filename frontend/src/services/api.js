import axios from "axios";

let apiURL = "http://localhost:3333";
const api = axios.create({
  baseURL: apiURL,
});

export default api;
