import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const PhoneInput = ({ control, error }) => {
  return (
    <div>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input type="tel" size="large" placeholder="شماره تلفن*" {...field} />
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

export default PhoneInput;
