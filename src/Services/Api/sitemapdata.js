import { executeGET } from "../Services/ServiceMethods";

export const SiteMapApi = async (marketplace_slug) => {
  try {
    const siteMap = await executeGET(
      `/vms/site-map-data?host_name=${marketplace_slug}`
    );
    const siteMapData = siteMap.data ? siteMap.data.data : {};
    return siteMapData;
  } catch (error) {
    return false;
  }
};
