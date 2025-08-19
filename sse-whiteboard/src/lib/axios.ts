import axiosMain from "axios";

const axios = axiosMain.create({
  baseURL: "http://localhost:5858/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
