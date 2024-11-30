import GlobalBtn from "@/components/global-button/GlobalBtn";
import { Result } from "antd";
import React from "react";

function Completed() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Result
        status="success"
        title="پرداخت با موفقیت انجام شد"
        extra={
          <div className="flex justify-center items-center w-full">
            <GlobalBtn
              title={"صفحه اصلی"}
              link={"/"}
              iconName={"PiHouseLineBold"}
              model={1}
            />
          </div>
        }
      />
    </div>
  );
}

export default Completed;
