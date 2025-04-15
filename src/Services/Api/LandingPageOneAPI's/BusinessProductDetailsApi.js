import { executePost } from "../../Services/ServiceMethods";

export const BusinessProductDetailsApi = async (data) => {
  try {
    const BusinessProductDetailsApi = await executePost(
      "/vms/landing/productdetail",
      data
    );
    const BusinessProductDetailsApiData = BusinessProductDetailsApi.data
      ? BusinessProductDetailsApi.data
      : [];
    return BusinessProductDetailsApiData;
  } catch (error) {
    return false;
  }
};
