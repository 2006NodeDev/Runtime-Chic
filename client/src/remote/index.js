// import { rcBaseUrl } from "../environment/environment.ts";

// we will use this object to send off all of the other request we make to the lightlyburning api
export const liveyourtruthClient = fetch({
  baseURL: "http://localhost:3003",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
