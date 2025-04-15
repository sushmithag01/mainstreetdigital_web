import { executePost } from "../../Services/ServiceMethods";

export const Privacy_pAndTerms_cApi = async (data) => {
  try {
    const Privacy_pAndTerms_cApi = await executePost(
      "/vms/landing/get_privacy_terms",
      data
    );
    const Privacy_pAndTerms_cApiData = Privacy_pAndTerms_cApi.data
      ? Privacy_pAndTerms_cApi.data
      : [];
    return Privacy_pAndTerms_cApiData;
  } catch (error) {
    return false;
  }
};
