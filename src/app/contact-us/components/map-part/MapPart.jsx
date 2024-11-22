"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

function MapPart({ position, children }) {
  const Map = useMemo(() => {
    return dynamic(() => import("../map/Map"), {
      loading: () => (
        <div className="flex justify-center items-center p-20 w-full">
          <Spin size="large" />
        </div>
      ),
      ssr: false,
    });
  }, []);

  return <Map position={position} children={children} />;
}

export default MapPart;
