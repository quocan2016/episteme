import { API_REPORT_ADMIN } from "../constants/api";
import { callGetAPIAuthorization } from "./fetchApiService";

export const getReportUserNew = async (startDate, endDate) => {
  const response = await callGetAPIAuthorization(
    `${API_REPORT_ADMIN}/users-new?startDate=${startDate}&endDate=${endDate}`
  );

  return response.data;
};

export const getReportPostNew = async (startDate, endDate) => {
  const response = await callGetAPIAuthorization(
    `${API_REPORT_ADMIN}/posts-new?startDate=${startDate}&endDate=${endDate}`
  );

  return response.data;
};
