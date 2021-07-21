import axios from "axios";

export const createRequest = () => {
  //const accessToken = localStorage.getItem("accessToken");

  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 3000,
    headers: {
      "Content-type": "application/json"
    },
  });

  return instance;
};
