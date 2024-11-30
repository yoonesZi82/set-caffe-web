"use client";
import React, { useEffect, useState } from "react";
import { PiBasketBold, PiCreditCardBold } from "react-icons/pi";

function Pay() {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    if (totalPrice) {
      setPrice(totalPrice);
    }
  }, [price]);
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <div className="desktop:w-1/2 laptop:w-1/2 bg-sidebarTheme rounded-[8px] w-full mobile:w-full tablet:w-full h-full">
        <header className="flex justify-start items-center gap-2 bg-navbarDashboard p-3 rounded-tl-[8px] rounded-tr-[8px] w-full">
          <span>
            {" "}
            <PiCreditCardBold color="#d2b48c" size={22} />{" "}
          </span>
          <span className="text-sidebarTheme text-xl"> مبلغ نهایی </span>
        </header>
        <main className="flex flex-col justify-center items-center gap-3 p-3 w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-navbarDashboard"> مبلغ قابل پرداخت </span>
            <span className="text-navbarDashboard">
              {" "}
              {price.toLocaleString()} تومان
            </span>
          </div>
        </main>
      </div>
      <div className="desktop:w-1/2 laptop:w-1/2 w-full mobile:w-full tablet:w-full text-center">
        <button
          class="relative bg-sidebarTheme rounded-[8px] w-48 h-10 font-semibold text-center text-navbarDashboard group"
          type="button"
        >
          <div class="group-hover:w-[184px] top-[4px] left-1 z-10 absolute flex justify-center items-center bg-navbarDashboard rounded-[6px] w-1/4 h-8 duration-500">
            <PiBasketBold size={22} color="#d2b48c" />
          </div>
          <p class="translate-x-2">پرداخت کنید</p>
        </button>
      </div>
    </div>
  );
}

export default Pay;
