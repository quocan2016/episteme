import { API_USER } from "../constants/api";
import { callGetAPI, callPutAPIAuthorization } from "./fetchApiService";

export const getAuthors = async () => {
  const response = await callGetAPI(API_USER);

  return response.data;
};

export const getPostsOfAuthor = async (userId) => {
  const response = await callGetAPI(`${API_USER}/${userId}/posts`);

  return response.data;
};

export const getAuthor = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}`);

  return response.data;
};

export const searchAuthors = async (value) => {
  const response = await callGetAPI(`${API_USER}/search?q=${value}`);

  return response.data;
};

export const getAllPostOfAuthor = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}/posts`);

  return response.data;
};

export const getAllDraftOfAuthor = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}/drafts`);

  return response.data;
};

export const getFollowingsOfAuthor = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}/following`);

  return response.data;
};

export const getFollowersOfAuthor = async (id) => {
  const response = await callGetAPI(`${API_USER}/${id}/follower`);

  return response.data;
};

export const getAllCardByType = async (type, id) => {
  const response = await callGetAPI(`${API_USER}/${id}/${type}`);
  return response.data;
};

export const updateAuthorInfo = async (id, data) => {
  const response = await callPutAPIAuthorization(`${API_USER}/${id}`, data);
  return response.data;
};

export const getStatisticByType = async (id, type) => {
  const response = await callGetAPI(`${API_USER}/${id}/${type}`);
  return response.data;
};

export const getPopularAuthors = async () => {
  const response = await callGetAPI(`${API_USER}/poppular/authors`);
  return response.data;
};
