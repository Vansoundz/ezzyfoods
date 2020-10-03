import Axios from "axios";
import { UserModel } from "../models/user.model";
import { setAuthHeader } from "./util";
import { config } from "dotenv";

config();

const api = process.env.REACT_APP_EZZYFOODS_API;

export default {
  register(user: UserModel) {
    return Axios.post(`${api}/users/register`, { ...user });
  },
  login({ email, password }: { email: string; password: string }) {
    return Axios.post(`${api}/users/login`, { email, password });
  },
  getUser() {
    return Axios.get(`${api}/users`, setAuthHeader());
  },
};
