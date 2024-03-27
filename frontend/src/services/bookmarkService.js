import { API_BOOKMARK, API_USER } from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callGetAPIAuthorization,
  callPostAPIAuthorization,
} from "./fetchApiService";

export const getBookmarksForUser = async (idUser) => {
  const response = await callGetAPIAuthorization(
    `${API_USER}/${idUser}/bookmarks`
  );

  return response.data;
};

export const getBookmarkForUser = async (idUser, idPost) => {
  const response = await callGetAPIAuthorization(
    `${API_USER}/${idUser}/bookmarks/${idPost}`
  );

  return response.data;
};

export const addBookmark = async (bookmark) => {
  const response = await callPostAPIAuthorization(API_BOOKMARK, bookmark);

  return response.data;
};

export const removeBookmark = async (id) => {
  const response = await callDeleteAPIAuthorization(`${API_BOOKMARK}/${id}`);

  return response.data;
};
