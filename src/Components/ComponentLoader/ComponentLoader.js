import React from "react";
import { ColorRing } from "react-loader-spinner";

const ComponentLoader = ({ color, height, width }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <ColorRing
        visible={true}
        height={height ? height : "80"}
        width={width ? width : "80"}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={
          color
            ? [color, color, color, color, color]
            : ["#E66100", "#E66100", "#E66100", "#E66100", "#E66100"]
        }
      />
    </div>
  );
};

export default ComponentLoader;
