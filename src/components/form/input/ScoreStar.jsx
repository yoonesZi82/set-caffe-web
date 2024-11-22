import React from "react";
import { Alert, Rate } from "antd";
import { Controller } from "react-hook-form";

const ScoreStar = ({ control, error }) => {
  return (
    <div>
      <Controller
        name="score"
        control={control}
        render={({ field }) => <Rate allowHalf {...field} />}
      />
      {error && (
        <Alert
          message={error}
          type="warning"
          showIcon
          className="mt-2 h-[32px] text-[12px]"
        />
      )}
    </div>
  );
};

export default ScoreStar;
