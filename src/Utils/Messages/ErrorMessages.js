export const ServerError = "Internal Server Error!";

export const SessionTimeout = "Your session has expired! Please log in again";

const ErrorText = {
  InternalError: "Internal server error",
  SessionTimeout: "Your session has expired! Please log in again",
  NoData: "No result found!",
  EmailRequiredError: "Email is required!",
  EmailValidError: "Enter a valid email address!",
  PasswordRequiredError: "Password is required!",
  PasswordRepeatRequiredError: "Repeat password is required!",
  PasswordMatchError: "Password and repeat password did not match!",
  PasswordValidError:
    "Password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!",
  OtpRequiredError: "OTP is required!",
  FirstNameError: "Firstname is required!",
  LastNameError: "Lastname is required!",
};
export default ErrorText;
