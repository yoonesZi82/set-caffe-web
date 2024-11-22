import React from "react";
import { Input, Alert } from "antd";
import { Controller } from "react-hook-form";
const { TextArea } = Input;

const MessageInput = ({ control, error, name, placeholder }) => {
  return (
    <div>
      <Controller
        name={name ? name : "message"}
        control={control}
        render={({ field }) => (
          <TextArea
            autoSize={{ minRows: 3, maxRows: 4 }}
            placeholder={placeholder ? placeholder : "متن پیام*"}
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

export default MessageInput;
