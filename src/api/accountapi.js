import { accountApi } from "./axios";

export const loginUser = async (data) => {
  return await accountApi.post("login/", data);
};

export const Oradmindash = async (data) => {
  return await accountApi.get("oradmin_dash/");
};