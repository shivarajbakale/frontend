import axios from "axios";

export const jsonServerClient = axios.create({
  baseURL: "http://localhost:3002",
});
