import React from "react";
import { ColorRing } from "react-loader-spinner";
import Loaderimage from "./Loaderimage";

const InitialLoader = () => {
  return (
    <div className="splashScreen3 initial">
      {/* <img loading="lazy" src={image} className="shopLocalKirklandLogo" /> */}
      <div>
        <Loaderimage />
        <p>Get ready for an extraordinary digital experience!</p>
        <ColorRing
          className="ringLoader"
          visible={true}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#6EB8F5", "#6EB8F5", "#6EB8F5", "#6EB8F5", "#6EB8F5"]}
        />
      </div>
    </div>
  );
};

export default InitialLoader;
