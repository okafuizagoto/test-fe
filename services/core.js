import axios from "axios";
import { getStorage } from "../utils/storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

const login = async (loginData) => {
  return await api.post("/gold-gym/v2/userdata/login", null, {
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(loginData.user + ":" + loginData.password).toString(
          "base64"
        ),
    },
  });
};

const getUserPT = async (nip, params) => {
  return await api.get(`/core/v1/users/${nip}/pt`, {
    headers: {
      Authorization: `${getStorage("access_token")}`,
    },
    params,
  });
};

const getUserOutlet = async (nip, params) => {
  return await api.get(`/core/v1/users/${nip}/outlet`, {
    headers: {
      Authorization: `${getStorage("access_token")}`,
    },
    params,
  });
};

export default { login, getUserPT, getUserOutlet };
