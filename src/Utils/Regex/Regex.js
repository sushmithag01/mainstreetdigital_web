const Regex = {
  PasswordTest: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/,
  EmailTest: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
export default Regex;
