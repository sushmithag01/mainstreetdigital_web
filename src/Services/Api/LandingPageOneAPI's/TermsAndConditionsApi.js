import { executePost } from "../../Services/ServiceMethods";

export const TermsAndConditionsApi = async (data) => {
  try {
    const TermsAndConditionsApi = await executePost(
      "/vms/landing/get_privacy_terms",
      data
    );
    const TermsAndConditionsApiData = TermsAndConditionsApi.data
      ? TermsAndConditionsApi.data
      : [];
    return TermsAndConditionsApiData;
  } catch (error) {
    return false;
  }
};
