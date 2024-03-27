import axios from "axios";
import { tokenAuthorization } from "../config/localStorage";

// GET

export const callGetAPI = async (url) => {
  const response = await axios({
    method: "GET",
    url,
  });
  return response;
};

export const callGetAPIAuthorization = async (url) => {
  const response = await axios({
    method: "GET",
    url,
    headers: { Authorization: tokenAuthorization() },
  });
  return response;
};

// POST

export const callPostAPI = async (url, data) => {
  const response = await axios({
    method: "POST",
    url,
    data,
  });
  return response;
};

export const callPostAPIAuthorization = async (url, data) => {
  const response = await axios({
    method: "POST",
    url,
    data,
    headers: { Authorization: tokenAuthorization() },
  });
  return response;
};

// PUT

export const callPutAPI = async (url, data) => {
  const response = await axios({
    method: "PUT",
    url,
    data,
  });
  return response;
};

export const callPutAPIAuthorization = async (url, data) => {
  const response = await axios({
    method: "PUT",
    url,
    data,
    headers: { Authorization: tokenAuthorization() },
  });
  return response;
};

// DELETE

export const callDeleteAPI = async (url, data) => {
  const response = await axios({
    method: "DELETE",
    url,
    data,
  });
  return response;
};

export const callDeleteAPIAuthorization = async (url, data) => {
  const response = await axios({
    method: "DELETE",
    url,
    data,
    headers: { Authorization: tokenAuthorization() },
  });
  return response;
};
