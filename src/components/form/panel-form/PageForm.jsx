import React from "react";

function PageForm({ children }) {
  return (
    <div className="flex mobile:justify-center mobile:items-center bg-[#ede6ea] bg-cover bg-fixed w-full h-screen overflow-hidden">
      <section className="desktop:block laptop:block hidden mobile:hidden tablet:hidden bg-darkBrown w-1/2 h-full">
        {/* <img
          src="./image/cafe-login-page.webp"
          alt=""
          className="h-full object-cover"
        /> */}
      </section>
      <div
        className="desktop:w-1/2 laptop:w-1/2 w-full mobile:w-full tablet:w-full"
        data-aos="fade-up"
      >
        {children}
      </div>
    </div>
  );
}

export default PageForm;
