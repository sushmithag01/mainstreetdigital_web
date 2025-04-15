export const getAddressString = (productDetail) => {
  if (typeof productDetail !== "object" || productDetail === null) {
    return "No data available";
  }
  const parts = [];
  const cleanField = (field) =>
    field ? field.replace(/,+/g, ",").replace(/^,|,$/g, "").trim() : "";
  if (productDetail.bup_address1) {
    parts.push(cleanField(productDetail.bup_address1));
  }
  if (productDetail.bup_address2) {
    parts.push(cleanField(productDetail.bup_address2));
  }
  if (productDetail.bup_city) {
    parts.push(cleanField(productDetail.bup_city));
  }
  if (productDetail.bup_state) {
    parts.push(cleanField(productDetail.bup_state));
  }
  if (productDetail.bup_country) {
    parts.push(cleanField(productDetail.bup_country));
  }
  return parts.length > 0 ? `${parts.join(", ")}` : "No data available";
};
