import {
  callDeleteAPIAuthorization,
  callGetAPI,
  callPostAPIAuthorization,
  callPutAPIAuthorization,
} from "./fetchApiService";
import { API_COMMENT, API_POST } from "./../constants/api";

export const getCommentPost = async (postId) => {
  const response = await callGetAPI(`${API_POST}/${postId}/comments`);

  return response.data;
};

export const addCommentPost = async (postId, data) => {
  const response = await callPostAPIAuthorization(
    `${API_POST}/${postId}/comments`,
    data
  );

  return response.data;
};

export const addCommentReplyPost = async (postId, commentReplyId, data) => {
  const response = await callPostAPIAuthorization(
    `${API_POST}/${postId}/comments/reply/${commentReplyId}`,
    data
  );

  return response.data;
};

export const updateComment = async (commentId, data) => {
  const response = await callPutAPIAuthorization(
    `${API_COMMENT}/${commentId}`,
    data
  );

  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await callDeleteAPIAuthorization(
    `${API_COMMENT}/${commentId}`
  );

  return response.data;
};
