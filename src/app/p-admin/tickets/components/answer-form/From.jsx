import ButtonForm from "@/components/form/button-form";
import { Alert } from "antd";
import React from "react";

function From({ handelSubmit, error, loading, children }) {
  return (
    <form onSubmit={handelSubmit} className="flex flex-col gap-3 p-6 w-full">
      {children}
      <div className="flex justify-center items-center w-full">
        <div className="w-1/2">
          <ButtonForm
            loading={loading}
            title="ثبت پاسخ"
            iconName="PiSendBold"
          />
        </div>
      </div>
      {error && (
        <Alert message={error} type="error" showIcon className="w-full" />
      )}
    </form>
  );
}

export default From;
