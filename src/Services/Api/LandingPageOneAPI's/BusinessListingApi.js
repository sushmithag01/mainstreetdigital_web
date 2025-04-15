import { executePost } from "../../Services/ServiceMethods";

export const BusinessListingApi = async (data) => {
  try {
    const businessListingApi = await executePost(
      "/vms/landing/businesslistingformarketplace",
      data
    );
    const businessListingApiData = businessListingApi.data
      ? businessListingApi.data
      : [];
    return businessListingApiData;
  } catch (error) {
    return false;
  }
};
