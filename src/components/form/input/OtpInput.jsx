import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const OtpInput = ({ control, error }) => {
  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <Input.OTP size="large" {...sharedProps} {...field} />
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

export default OtpInput;
