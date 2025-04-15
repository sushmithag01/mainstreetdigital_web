import { executeGET } from "../../ServiceMethods";

export const MarketplaceSupportData = async (data) => {
  try {
    const MarketplaceSupportData = await executeGET(
      "/vms/marketplace_playbook_support",
      data
    );
    const MarketplaceSupportDataApi = MarketplaceSupportData.data
      ? MarketplaceSupportData.data
      : {};
    return MarketplaceSupportDataApi;
  } catch (err) {
    return false;
  }
};
