import { executePost } from "../../Services/ServiceMethods";

export const CommonInnerPageInfoApi = async (data) => {
  try {
    const commonInnerPageInfoApi = await executePost(
      "/vms/mms/landingPageDetails",
      data
    );
    const commonInnerPageInfoData = commonInnerPageInfoApi.data
      ? commonInnerPageInfoApi.data
      : [];
    return commonInnerPageInfoData;
  } catch (error) {
    return false;
  }
};
