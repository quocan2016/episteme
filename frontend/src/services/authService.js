import { API_AUTH, API_USER } from "../constants/api";
import {
  callGetAPI,
  callPostAPI,
  callPutAPI,
  callPutAPIAuthorization,
} from "./fetchApiService";

export const register = async (data) => {
  return await callPostAPI(`${API_AUTH}/register`, data);
};

export const login = async (data) => {
  return await callPostAPI(`${API_AUTH}/login`, data);
};

export const loginWithGoogle = async (data) => {
  return await callPostAPI(`${API_AUTH}/login-google`, data);
};

export const getUserWithToken = async (token) => {
  const response = await callGetAPI(`${API_USER}/token/${token}`);

  return response.data;
};

export const getAuthorById = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}`);

  return response.data;
};

export const changePassword = async (data) => {
  const response = await callPutAPIAuthorization(
    `${API_AUTH}/change-password`,
    data
  );
  return response.data;
};
