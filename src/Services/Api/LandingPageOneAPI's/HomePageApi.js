import { executePost } from "../../Services/ServiceMethods";

export const HomePageApi = async (slug) => {
  try {
    const homePageApi = await executePost("/vms/getmarketplace/homepage", slug);
    const homePageApiData = homePageApi.data ? homePageApi.data : [];
    return homePageApiData;
  } catch (error) {
    return false;
  }
};
