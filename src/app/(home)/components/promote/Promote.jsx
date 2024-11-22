"use client";
import GlobalBtn from "@/components/global-button/GlobalBtn";

const Promote = () => {
  return (
    <div className="bg-[#f3f3f3] px-[45px]">
      <div data-aos="fade-up-right" className="mx-auto my-0 max-w-[1222px]">
        <main className="text-right flex desktop:flex-row-reverse laptop:flex-row-reverse flex-col mobile:flex-col tablet:flex-col justify-center desktop:justify-between laptop:justify-between mobile:justify-center tablet:justify-center items-center desktop:items-center laptop:items-center mobile:items-center tablet:items-center gap-[80px] mt-20 mb-12">
          <section className="w-1/2 text-black">
            <div className="pt-10 pr-5 pb-5 text-center">
              <span className="text-[32px] text-navbarDashboard">
                خرید قهوه ، به سبک حرفه ای ها
              </span>
              <p className="mt-[15px] mb-20 text-[15px] text-sidebarTheme">
                زیبایی امروز رو با قهوه “ست” کنید
              </p>
            </div>
            <img
              data-aos="fade-left"
              src="/image/coffee-image-1.jpg"
              alt="cover"
              className="object-cover"
              onError={(e) => {
                e.target.src = "/image/not-found.png";
              }}
            />
          </section>
          <section className="relative mt-[10px] rounded-lg club">
            {" "}
            <div className="desktop:visible bottom-0 left-0 z-10 absolute flex flex-col justify-center items-center gap-[10px] bg-white py-[50px] p-[30px] rounded-tr-lg rounded-bl-lg w-[411px] text-center invisible mobile:invisible tablet:visible laptop:visible">
              <span className="text-navbarDashboard">باشگاه مشتریان ست</span>
              <p className="text-[15px] text-sidebarTheme">
                برای مشتریان وفادار قهوه ست
              </p>
            </div>
            <img
              className="rounded-lg object-cover"
              data-aos="fade-right"
              src="/image/clubset1.jpg"
              alt="cover"
              onError={(e) => {
                e.target.src = "/image/not-found.png";
              }}
            />
          </section>
        </main>
        <main className="text-right flex desktop:flex-row-reverse laptop:flex-row-reverse flex-col mobile:flex-col tablet:flex-col justify-center desktop:justify-between laptop:justify-between mobile:justify-center tablet:justify-center items-center desktop:items-center laptop:items-center mobile:items-center tablet:items-center gap-[80px] mt-20 mb-12">
          <img
            src="/image/Home32.jpg"
            alt="cover"
            className="rounded-lg w-[660px] h-[530px] object-cover"
            onError={(e) => {
              e.target.src = "/image/not-found.png";
            }}
          />
          <section
            data-aos="fade-up"
            className="desktop:w-full flex flex-col justify-start items-start gap-[14px] w-full mobile:w-full tablet:[70%] laptop:w-full"
          >
            <p className="text-[44px] text-navbarDashboard">چرا قهوه ست</p>
            <p className="text-sidebarTheme leading-6">
              برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان
              راهنمای ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است
              .تجربه ای به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه
              ضامن این ویژگیها است.
            </p>
            <div className="flex justify-start items-start gap-[10px]">
              <GlobalBtn
                title={"فروشگاه"}
                link={"/category"}
                model={2}
                iconName={"PiBasketBold"}
              />
              <GlobalBtn
                title={"بیشتر بخوانید"}
                link={"/about-us"}
                iconName={"PiMagnifyingGlassBold"}
                model={1}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Promote;
