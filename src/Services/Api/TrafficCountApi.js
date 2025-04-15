import { executePost } from "../ServiceMethods";

export const TrafficCountApi = async (data) => {
  try {
    const TrafficCountApi = await executePost(
      "/vms/landing/marketplace_traffic_click",
      data
    );
    const TrafficCountApiData = TrafficCountApi.data
      ? TrafficCountApi.data
      : {};
    return TrafficCountApiData;
  } catch (err) {
    return false;
  }
};
