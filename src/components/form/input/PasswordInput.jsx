import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const PasswordInput = ({ control, error, name, placeholder }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.Password size="large" placeholder={placeholder} {...field} />
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

export default PasswordInput;
