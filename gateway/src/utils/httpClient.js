import axios from "axios";

export const forwardRequest = async (url, req) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (req.headers.authorization) {
    headers.authorization = req.headers.authorization;
  }

  return await axios({
    method: req.method,
    url,
    params: req.query,
    data: req.body,
    headers,
    timeout: 10000,
    validateStatus: () => true,
  });
};