import axios from "axios";

let mbBaseUrl =
  process.env["MESSAGEBOARD_SERVICE_HOST"] ||
  "http://34.120.86.250:80/messageboard-service";

export const service = axios.create({
  baseURL: mbBaseUrl,
  headers: {
    "Content-Type": "application/json",
    jwt_token: localStorage.token,
  },
});
