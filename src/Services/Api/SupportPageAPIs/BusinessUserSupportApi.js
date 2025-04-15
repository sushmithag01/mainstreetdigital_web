import { executeGET } from "../../ServiceMethods";

export const BusinessUserSupportData = async (data) => {
  try {
    const BusinessUserSupportData = await executeGET(
      "/vms/business_user_support",
      data
    );
    const BusinessUserSupportDataApi = BusinessUserSupportData.data
      ? BusinessUserSupportData.data
      : {};
    return BusinessUserSupportDataApi;
  } catch (err) {
    return false;
  }
};
