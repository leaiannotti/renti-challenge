import axios from "axios";

const API_URL = "http://localhost:3030/auth";

const register = (username, password,firstname,lastname) => {
  return axios
    .post(API_URL + "/register", {
      username,
      password,
      firstname,
      lastname
    })
    .then((response) => {
        return response.status === 200;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    login,
    getCurrentUser,
};

export default authService;