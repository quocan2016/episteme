import {
  API_POST,
  API_POST_ADMIN,
  API_USER,
  API_USER_ADMIN,
} from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callGetAPI,
  callGetAPIAuthorization,
  callPostAPIAuthorization,
  callPutAPIAuthorization,
} from "./fetchApiService";

export const getPosts = async () => {
  const response = await callGetAPI(API_POST);

  return response.data;
};

export const incrementView = async (id) => {
  const response = await callGetAPI(`${API_POST}/increase-view/${id}`);

  return response.data;
};

export const getPostsForAdmin = async () => {
  const response = await callGetAPIAuthorization(API_POST_ADMIN);

  return response.data;
};

export const getPostsPedingForAdmin = async () => {
  const response = await callGetAPIAuthorization(`${API_POST_ADMIN}/pending`);

  return response.data;
};

export const getPostsByType = async ({
  type = undefined,
  pageNumber = 0,
  pageSize = 8,
  sortBy = "title",
  sortDir = "asc",
}) => {
  const typeParam = type ? `type=${type}` : "";
  const response = await callGetAPI(
    `${API_POST}?${typeParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

export const searchPost = async ({
  q = "",
  pageNumber = 0,
  pageSize = 8,
  sortBy = "title",
  sortDir = "asc",
}) => {
  const response = await callGetAPI(
    `${API_POST}/search?q=${q}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

  return response.data;
};

export const getPostById = async (id) => {
  const response = await callGetAPI(`${API_POST}/${id}`);

  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await callGetAPI(`${API_POST}/by-slug/${slug}`);

  return response.data;
};

export const createPost = async (data, id) => {
  const response = await callPostAPIAuthorization(
    `${API_USER}/${id}/posts`,
    data
  );

  return response.data;
};

export const updatePostForAdmin = async (id, data) => {
  const response = await callPutAPIAuthorization(
    `${API_POST_ADMIN}/${id}`,
    data
  );

  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await callPutAPIAuthorization(`${API_POST}/${id}`, data);

  return response.data;
};

export const deletePost = async (id) => {
  const response = await callDeleteAPIAuthorization(`${API_POST}/${id}`);

  return response.data;
};
