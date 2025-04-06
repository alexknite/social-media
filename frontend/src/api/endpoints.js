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
  const res = await api.post("/token/refresh/");
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

export const get_auth = async () => {
  const res = await api.get(`/authenticated/`);
  return res.data;
};

export const toggle_follow = async (username) => {
  const res = await api.post("/toggle_follow/", {
    username: username,
  });
  return res.data;
};

export const get_users_posts = async (username, arch) => {
  const res = await api.get(`/posts/${username}/${arch}`);
  return res.data;
};

export const toggle_like = async (id) => {
  const res = await api.post("/toggle_like/", { id: id });
  return res.data;
};

export const create_post = async (description) => {
  const res = await api.post("/create_post/", { description: description });
  return res.data;
};

export const get_posts = async (num) => {
  const res = await api.get(`/get_posts/?page=${num}`);
  return res.data;
};

export const search_users = async (search) => {
  const res = await api.get(`/search/?query=${search}`);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/logout/");
  return res.data;
};

export const update_user = async (values) => {
  const res = await api.patch("/update_user/", values, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const delete_post = async (id) => {
  const res = await api.delete(`/delete_post/${id}/`);
  return res.data;
};

export const delete_user = async (username) => {
  const res = await api.delete(`/delete_user/${username}/`);
  return res.data;
};

export const toggle_archived = async (id, archived) => {
  const res = await api.patch(`/toggle_archived/${id}/`, {
    archived: archived,
  });
  return res.data;
};

export const toggle_muted = async (username) => {
  const res = await api.post(`/toggle_muted/${username}/`);
  return res.data;
};

export const report_user = async (username, values) => {
  const res = await api.post(`/report_user/${username}/`, values);
  return res.data;
};

export const get_reports = async (num) => {
  const res = await api.get(`/get_reports/?page=${num}`);
  return res.data;
};

export const toggle_resolved = async (id) => {
  const res = await api.patch(`/toggle_resolved/${id}/`);
  return res.data;
};
