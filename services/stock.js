import axios from "axios";
import { getStorage } from "../utils/storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 10000,
});

const getOneStock = async (stockid, stockcode) => {
  return await api.get(
    `/gold-gym/v2/userdata?type=getonestock&stockid=${stockid}&stockcode=${stockcode}&stockname=`,
    {
      headers: {
        Authorization: `${getStorage("access_token")}`,
      },
    }
  );
};

const getAllStockHeader = async () => {
  return await api.get(
    `/gold-gym/v2/userdata?type=getallstock`,
    {
      headers: {
        Authorization: `${getStorage("access_token")}`,
      },
    }
  );
};

export default { getOneStock, getAllStockHeader };