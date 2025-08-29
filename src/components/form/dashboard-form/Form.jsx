import React from "react";
import { Alert } from "antd";
import ButtonForm from "../button-form";

function Form({ children, handleSubmit, error, loading }) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between gap-4 w-full h-full"
      >
        {children}
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <ButtonForm
            title={"ارسال"}
            loading={loading}
            iconName={"PiSendBold"}
          />
        </div>
        {error && (
          <div className="w-full laptop:w-1/2 mobile:w-full tablet:w-full desktop:w1/2">
            <Alert
              message={error}
              type="error"
              showIcon
              className="mt-2 h-[32px] text-[12px]"
            />
          </div>
        )}
      </form>
    </>
  );
}

export default Form;
