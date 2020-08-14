import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.pgconfig.org/v1/tuning/",
  timeout: 1000
});

export default instance;
