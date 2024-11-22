import { Result } from "antd";
import React from "react";
import GlobalBtn from "../global-button/GlobalBtn";

const CreateSoon = () => {
  return (
    <div className="desktop:px-[163px] laptop:px-[163px] px-0 mobile:px-0 tablet:px-0 pt-[150px] pb-[100px]">
      <Result
        status="404"
        title="به زودی"
        subTitle="این صفحه به زودی در دسترس قرار میگرد ممنون از صبوری شما"
        extra={
          <div className="flex justify-center items-center w-full">
            <GlobalBtn
              title={"صفحه اصلی"}
              link={"/"}
              model={1}
              iconName={"PiHouseLineBold"}
            />
          </div>
        }
      />
    </div>
  );
};

export default CreateSoon;
