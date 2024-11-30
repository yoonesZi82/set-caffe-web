import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";

const NumberInput = ({ control, error, name, placeholder }) => {
  return (
    <div>
      <Controller
        name={name ? name : "number"}
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            size="large"
            placeholder={placeholder ? placeholder : null}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
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

export default NumberInput;
