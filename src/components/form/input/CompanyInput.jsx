import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const CompanyInput = ({ control, error }) => {
  return (
    <div>
      <Controller
        name="company"
        control={control}
        render={({ field }) => (
          <Input size="large" placeholder="کمپانی*" {...field} />
        )}
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

export default CompanyInput;
