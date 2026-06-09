import axios from "axios";
import { ServerUrl } from "../../config/apiPath";

export const getCurrentUser = async () => {
  const result = await axios.get(`${ServerUrl}/api/user/current-user`, {
    withCredentials: true,
  });
  return result.data;
};

export const getMyInterviews = async () => {
  const result = await axios.get(`${ServerUrl}/api/interview/get-interview`, {
    withCredentials: true,
  });
  return result.data;
};
