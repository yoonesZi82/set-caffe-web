import React from "react";
import ButtonForm from "../button-form";
import { Alert } from "antd";
function Form({ title, description, children, handleSubmit, error, loading }) {
  return (
    <>
      <span className="text-sidebarTheme text-sm"> {title} </span>
      <p className="mt-4 mb-8 text-[22px] text-navbarDashboard">
        {description}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {children}
        <ButtonForm title={"ارسال"} loading={loading} />
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mt-2 h-[32px] text-[12px]"
          />
        )}
      </form>
    </>
  );
}

export default Form;
