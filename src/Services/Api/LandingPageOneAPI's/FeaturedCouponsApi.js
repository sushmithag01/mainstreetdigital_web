import { executePost } from "../../Services/ServiceMethods";

export const FeaturedCouponsApi = async (data) => {
  try {
    const featuredCouponssApi = await executePost(
      "/vms/landing/featuredcoupons",
      data
    );
    const featuredCouponssApiData = featuredCouponssApi.data
      ? featuredCouponssApi.data
      : [];
    return featuredCouponssApiData;
  } catch (error) {
    return false;
  }
};
