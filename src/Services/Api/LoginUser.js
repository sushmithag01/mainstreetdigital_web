import { executePost } from "../ServiceMethods";

export const LoginUser = async (LoginCredentials) => {
  try {
    const UserLogin = await executePost("/vms/SignIn", LoginCredentials);
    const UserLoginData = UserLogin.data ? UserLogin.data : {};
    return UserLoginData;
  } catch (err) {
    return false;
  }
};
