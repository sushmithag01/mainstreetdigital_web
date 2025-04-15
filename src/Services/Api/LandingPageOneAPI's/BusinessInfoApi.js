import { executePost } from "../../Services/ServiceMethods";

export const BusinessInfoApi = async (data) => {
  try {
    const businessInfoApi = await executePost(
      "/vms/mms/businessusermarketplacelink",
      data
    );
    const businessInfoApiData = businessInfoApi.data
      ? businessInfoApi.data
      : [];
    return businessInfoApiData;
  } catch (error) {
    return false;
  }
};
