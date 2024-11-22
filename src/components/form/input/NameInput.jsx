import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const NameInput = ({ control, error, defaultValue, name, placeholder }) => {
  return (
    <div>
      <Controller
        name={name ? name : "name"}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            size="large"
            placeholder={placeholder ? placeholder : "نام*"}
            {...field}
          />
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

export default NameInput;
