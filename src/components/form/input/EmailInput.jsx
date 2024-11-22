import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const EmailInput = ({ control, error, defaultValue }) => {
  return (
    <div>
      <Controller
        name="email"
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input size="large" placeholder="ایمیل*" {...field} />
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

export default EmailInput;
