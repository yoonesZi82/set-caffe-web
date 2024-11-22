"use client";
import React, { useEffect, useState } from "react";
import { PiCreditCardBold } from "react-icons/pi";
import { Collapse } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import offCodeSchema from "./from/form-schema/schema";
import OffCodeInput from "@/components/form/input/offCodeInput";
import axios from "axios";
import showNotification from "@/utils/notification";

function InvoiceBox({ user }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceOff, setPriceOff] = useState(0);
  const [totalPriceForOff, setTotalPriceForOff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(offCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("orders"));
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.count * item.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  const sendCode = (data) => {
    setLoading(true);
    axios
      .put("/api/discounts/use", {
        code: data.code,
        userID: user.id,
      })
      .then((res) => {
        if (res.status === 200) {
          const newPriceOff = (totalPrice * res.data.percent) / 100;
          setPriceOff(newPriceOff);
          const finalPrice = totalPrice - newPriceOff;
          setTotalPriceForOff(finalPrice);
          setDisable(true);
          showNotification({
            type: "success",
            message: "پیغام",
            description: "کد تخفیف با موفقیت اعمال شد",
          });
        }
      })
      .catch((err) => {
        if (err.status === 403) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "کد تخفیف یافت نشد",
          });
        } else if (err.status === 405) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "کد تخفیف منقضی شده است",
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const items = [
    {
      key: "1",
      label: "کد تخفیف ندارید؟",
      children: (
        <form onSubmit={handleSubmit(sendCode)}>
          <OffCodeInput
            control={control}
            error={errors.code?.message}
            loading={loading}
            disable={disable}
          />
        </form>
      ),
    },
  ];
  if (typeof window != "undefined") {
    localStorage.setItem(
      "totalPrice",
      JSON.stringify(totalPriceForOff > 0 ? totalPriceForOff : totalPrice)
    );
  }
  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full">
      <div className="desktop:w-1/2 laptop:w-1/2 bg-sidebarTheme rounded-[8px] w-full mobile:w-full tablet:w-full h-full">
        <header className="flex justify-start items-center gap-2 bg-navbarDashboard p-3 rounded-tl-[8px] rounded-tr-[8px] w-full">
          <span>
            {" "}
            <PiCreditCardBold color="#d2b48c" size={22} />{" "}
          </span>
          <span className="text-sidebarTheme text-xl"> فاکتور پرداختی </span>
        </header>
        <main className="flex flex-col justify-center items-center gap-3 p-3 w-full">
          <div className="flex justify-between items-center w-full">
            <span className="text-navbarDashboard"> مبلغ کل </span>
            <span className="text-navbarDashboard">
              {" "}
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="text-navbarDashboard"> تخفیف </span>
            <span className="text-navbarDashboard">
              {" "}
              {priceOff.toLocaleString()} تومان{" "}
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="text-navbarDashboard"> موجودی کیف پول </span>
            <span className="text-navbarDashboard">0 تومان</span>
          </div>
          <hr className="border-[1px] border-navbarDashboard w-full" />
          <div className="flex justify-between items-center w-full">
            <span className="text-navbarDashboard"> مبلغ پرداختی </span>
            <span className="text-navbarDashboard">
              {" "}
              {totalPriceForOff > 0
                ? totalPriceForOff.toLocaleString()
                : totalPrice.toLocaleString()}{" "}
              تومان{" "}
            </span>
          </div>
        </main>
      </div>
      <div className="desktop:w-1/2 laptop:w-1/2 w-full mobile:w-full tablet:w-full">
        <Collapse items={items} />
      </div>
    </div>
  );
}

export default InvoiceBox;
