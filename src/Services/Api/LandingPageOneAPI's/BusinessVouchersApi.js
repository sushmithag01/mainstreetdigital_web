import { executePost } from "../../Services/ServiceMethods";

export const BusinessVouchersApi = async (data) => {
  try {
    const businessVouchersApi = await executePost(
      "/vms/landing/businesslandingvouchers",
      data
    );
    const businessVouchersApiData = businessVouchersApi.data
      ? businessVouchersApi.data
      : [];
    return businessVouchersApiData;
  } catch (error) {
    return false;
  }
};
