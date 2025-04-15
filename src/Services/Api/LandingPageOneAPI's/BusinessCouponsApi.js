import { executePost } from "../../Services/ServiceMethods";

export const BusinessCouponsApi = async (data) => {
  try {
    const businessCouponsApi = await executePost(
      "/vms/landing/businesslandingcoupons",
      data
    );
    const businessCouponsApiData = businessCouponsApi.data
      ? businessCouponsApi.data
      : [];
    return businessCouponsApiData;
  } catch (error) {
    return false;
  }
};
