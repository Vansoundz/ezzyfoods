import { UserModel } from "../models/user.model";
import userApi from "../api/auth.api";

const register = async ({ user }: { user: UserModel }) => {
  const resp = (await userApi.register(user)).data;
  return resp;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const resp = (await userApi.login({ email, password })).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const getUser = async () => {
  let resp = (await userApi.getUser()).data;
  return resp;
};

export { register, login, getUser };
