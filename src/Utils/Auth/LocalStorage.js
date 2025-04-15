export const SetUserSocialLoginCredentials = (val) => {
  const SlToken = val.jwt_token ? val.jwt_token : "";
  const UserId = val.uid ? val.uid : "";
  const UserName = val.first_name ? val.first_name : "";
  const cityId = val.user_city_id ? val.user_city_id : "";

  localStorage.setItem("token", SlToken);
  localStorage.setItem("userId", UserId);
  localStorage.setItem("FirstName", UserName);
  localStorage.setItem("userName", UserName);
  localStorage.setItem("city_id", cityId);
};

export const getUser = () => {
  const userData = localStorage.getItem("user");
  if (userData !== null) {
    return JSON.parse(userData);
  }
  return null;
};

// Utility to fetch user data from localStorage
const getUserInfo = () => {
  const userInfo = localStorage.getItem("user");
  return userInfo ? JSON.parse(userInfo) : null;
};

//user ID
export const userId = () => {
  const userInfo = getUserInfo();
  return userInfo?.uid || null;
};
//user ID
export const userName = () => {
  const userInfo = getUserInfo();
  return userInfo?.first_name || null;
};

//city ID
export const CityId = () => {
  const userInfo = getUserInfo();
  return userInfo?.user_city_id || null;
};
// jtw-token
export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const userInfo = getUserInfo();
  return userInfo?.jwt_token || null;
};

export const getUserName = () => {
  const userName = localStorage.getItem("username");
  if (userName !== null) {
    return userName;
  }
  return null;
};

export const GetSocialLoginToken = () => {
  const SlToken = localStorage.getItem("SlToken");

  if (SlToken !== null) {
    return SlToken;
  }
  return null;
};

export const GetSlUserName = () => {
  const userName = localStorage.getItem("userName");

  if (userName !== null) {
    return userName;
  }
  return null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const removeUserCredentials = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("user");
  // localStorage.removeItem("userId");
  // localStorage.removeItem("category_id");
  // localStorage.removeItem("city_id");
  // localStorage.removeItem("cityId");
  // localStorage.removeItem("username");
  // localStorage.removeItem("firebase_token");
  // localStorage.removeItem("SlToken");
  // localStorage.removeItem("FirstName");
  // localStorage.removeItem("userName");
  // localStorage.removeItem("persist:root2");
  // localStorage.removeItem("ProfileImage");
  localStorage.clear();
};

export const setFirebaseToken = (Firebasetoken) => {
  localStorage.setItem("firebase_token", Firebasetoken);
};

export const getFirebaseToken = () => {
  const firebaseTok = localStorage.getItem("firebase_token");
  if (firebaseTok !== null) {
    return firebaseTok;
  }
  return null;
};
