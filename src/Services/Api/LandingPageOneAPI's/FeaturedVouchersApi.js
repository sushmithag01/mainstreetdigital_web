import { executePost } from "../../Services/ServiceMethods";

export const FeaturedVouchersApi = async (data) => {
  try {
    const featuredVouchersApi = await executePost(
      "/vms/landing/featuredvouchers",
      data
    );
    const featuredVouchersData = featuredVouchersApi.data
      ? featuredVouchersApi.data
      : [];
    return featuredVouchersData;
  } catch (error) {
    return false;
  }
};
