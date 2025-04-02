import axios from "axios";

import { SERVER_URL } from "../constants/constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original_request = error.config;

    if (error.response?.status === 401 && !original_request._retry) {
      original_request._retry = true;

      try {
        await refresh_token();
        return api(original_request);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const get_user_profile_data = async (username) => {
  const res = await api.get(`/user_data/${username}/`);
  return res.data;
};

const refresh_token = async () => {
  const res = await api.post("/token/refresh");
  return res.data;
};

export const login = async (username, password) => {
  const res = await api.post("/token/", { username, password });
  return res.data;
};

export const register = async (
  username,
  email,
  firstName,
  lastName,
  password,
) => {
  const res = await api.post("/register/", {
    username: username,
    email: email,
    first_name: firstName,
    last_name: lastName,
    password: password,
  });
  return res.data;
};
