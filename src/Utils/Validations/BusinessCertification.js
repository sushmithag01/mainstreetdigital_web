import LGBT from "../assets/LGBT.svg";
import WomanOwned from "../assets/WomenOwned.svg";
import Minority from "../assets/Minority_Icon.svg";
import badVeterange from "../assets/Veteran_Icon.svg";

export const BusinessCertificationImg = (gender) => {
  if (gender === "LGBTQ+") {
    return LGBT;
  } else if (gender === "Minority") {
    return Minority;
  } else if (gender === "Veteran") {
    return badVeterange;
  } else if (gender === "Women Owned") {
    return WomanOwned;
  }
};
