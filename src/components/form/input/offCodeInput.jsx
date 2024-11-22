import React from "react";
import { Input, Alert, Button } from "antd";
import { Controller } from "react-hook-form";

const OffCodeInput = ({ control, error, loading, disable }) => {
  return (
    <div>
      <Controller
        name="code"
        control={control}
        render={({ field }) => (
          <div className="flex justify-center items-center bg-navbarDashboard py-1 pl-2 border-none rounded-[8px] w-full">
            <Input
              size="large"
              className="bg-transparent focus:shadow-none pr-[15px] border-none focus:border-none text-sidebarTheme outline-none"
              placeholder="کد تخفیف*"
              {...field}
            />
            <Button
              htmlType="submit"
              className="bg-sidebarTheme hover:bg-navbarDashboard px-5 border-none rounded-[8px] text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500 outline-none"
              loading={loading}
              disabled={disable}
            >
              {" "}
              اعمال تخفیف{" "}
            </Button>
          </div>
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

export default OffCodeInput;
