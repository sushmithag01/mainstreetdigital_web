export const formatPhoneNumber = (value) => {
  let digits = value.replace(/\D/g, "");
  digits = digits.substring(0, 10);
  let formatted = digits;
  if (digits.length > 3) {
    formatted = digits.substring(0, 3) + "-" + digits.substring(3);
  }
  if (digits.length > 6) {
    formatted = formatted.substring(0, 7) + "-" + formatted.substring(7);
  }

  return formatted;
};

export const validatePhoneNumber = (value) => {
  let digits = value.replace(/\D/g, "");
  return digits.length === 10;
};
