import React from "react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";

const CheckboxInput = ({ control, error, title }) => {
  return (
    <div>
      <Controller
        name="checkbox"
        control={control}
        render={({ field: { value, ...otherField } }) => (
          <Checkbox checked={value} {...otherField}>
            {title}
          </Checkbox>
        )}
      />
    </div>
  );
};

export default CheckboxInput;
