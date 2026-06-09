import axios from "axios";
import { ServerUrl } from "../../config/apiPath";

export const createOrder = async ({ planId, amount, credits }) => {
  const result = await axios.post(
    `${ServerUrl}/api/payment/order`,
    { planId, amount, credits },
    { withCredentials: true },
  );
  return result.data;
};

export const verifyPayment = async (paymentResponse) => {
  const result = await axios.post(
    `${ServerUrl}/api/payment/verify`,
    paymentResponse,
    { withCredentials: true },
  );
  return result.data;
};
