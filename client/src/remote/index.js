import axios from "axios";
import { rcBaseUrl } from "../environment/environment.ts";

// we will use this object to send off all of the other request we make to the lightlyburning api
export const liveyourtruthClient = axios.create({
  baseURL: rcBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
