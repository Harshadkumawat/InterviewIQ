import axios from "axios";
import { ServerUrl } from "../../config/apiPath";

export const googleSignIn = async ({ name, email }) => {
  const result = await axios.post(
    `${ServerUrl}/api/auth/google`,
    { name, email },
    { withCredentials: true },
  );
  return result.data;
};

export const logoutUser = async () => {
  await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true });
};
