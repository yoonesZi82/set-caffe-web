import React from "react";
import { ColorRing, Hourglass } from "react-loader-spinner";

function Loader() {
  return (
    <div className="w-full flex justify-center items-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#4b382a", "#d2b48c"]}
      />
    </div>
  );
}

function ColorRingLoader() {
  return (
    <div className="w-full flex justify-center items-center">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#4b382a"]}
      />
    </div>
  );
}

export { Loader, ColorRingLoader };
