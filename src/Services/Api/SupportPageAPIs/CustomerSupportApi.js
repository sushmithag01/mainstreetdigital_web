import { executeGET } from "../../ServiceMethods";

export const CustomerSupportData = async (data) => {
  try {
    const CustomerSupportData = await executeGET(
      "/vms/customer_playbook_support",
      data
    );
    const CustomerSupportDataApi = CustomerSupportData.data
      ? CustomerSupportData.data
      : {};
    return CustomerSupportDataApi;
  } catch (err) {
    return false;
  }
};
