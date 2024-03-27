import { API_FOLLOW } from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callGetAPIAuthorization,
  callPostAPIAuthorization,
} from "./fetchApiService";

export const follow = async (data) => {
  const response = await callPostAPIAuthorization(API_FOLLOW, data);

  return response.data;
};

export const checkFollow = async (data) => {
  const response = await callPostAPIAuthorization(`${API_FOLLOW}/check`, data);

  return response.data;
};

export const unfollow = async (data) => {
  const response = await callDeleteAPIAuthorization(API_FOLLOW, data);

  return response.data;
};
