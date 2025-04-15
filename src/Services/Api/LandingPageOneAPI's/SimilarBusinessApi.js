import { executePost } from "../../Services/ServiceMethods";

export const SimilarBusinessApi = async (data) => {
  try {
    const similarBusinessApi = await executePost(
      "/vms/landing/similarlocal",
      data
    );
    const similarBusinessData = similarBusinessApi.data
      ? similarBusinessApi.data
      : [];
    return similarBusinessData;
  } catch (error) {
    return false;
  }
};
