import React from "react";
import { Alert } from "antd";
import ButtonForm from "../button-form";

function Form({ children, handleSubmit, error, loading }) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4 w-full h-full"
      >
        {children}
        <div className="desktop:w-1/2 laptop:w-1/2 flex flex-col justify-center items-center gap-4 w-full mobile:w-full tablet:w-full">
          <ButtonForm
            title={"ارسال"}
            loading={loading}
            iconName={"PiSendBold"}
          />
        </div>
        {error && (
          <div className="desktop:w1/2 laptop:w-1/2 w-full mobile:w-full tablet:w-full">
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
