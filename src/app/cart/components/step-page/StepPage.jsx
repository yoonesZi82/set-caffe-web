"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import ProductTable from "../tabel/ProductTable";
import Link from "next/link";
import showNotification from "@/utils/notification";
import InvoiceBox from "../invoice/InvoiceBox";
import Pay from "../pay/Pay";
import Completed from "../completed/Completed";

function StepPage({ user }) {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem("orders")) || [];
    setProducts(product);
  }, []);

  const next = () => {
    if (user) {
      setCurrent(current + 1);
    } else {
      showNotification({
        type: "error",
        message: "پیغام",
        description: "برای طی کردن مراحل بعدی ابتدا وارد شوید",
      });
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "مشاهده سفارش",
      content: <ProductTable />,
    },
    {
      title: "تایید فاکتور",
      content: <InvoiceBox user={user} />,
    },
    {
      title: "پرداخت",
      content: <Pay />,
    },
    {
      title: "تکمیل شده",
      content: <Completed />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    content: item.content,
  }));

  return (
    <div className="desktop:px-[163px] laptop:px-[163px] flex flex-col gap-5 mx-auto mb-[50px] px-6 mobile:px-6 tablet:px-6 py-5 w-full">
      <Steps current={current} items={items} />
      <div className="mt-6">{steps[current].content}</div>
      <div className="flex flex-col justify-center items-center gap-3 mt-4 w-full">
        {current === 0 ? (
          <Button
            type="primary"
            className="bg-sidebarTheme hover:bg-navbarDashboard w-1/2 text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
            onClick={() => next()}
            disabled={products.length === 0 ? true : false}
          >
            تایید سفارش
          </Button>
        ) : current === 1 ? (
          <Button
            type="primary"
            className="bg-sidebarTheme hover:bg-navbarDashboard w-1/2 text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
            disabled={products.length === 0 ? true : false}
            onClick={() => next()}
          >
            تایید فاکتور
          </Button>
        ) : current === 2 ? (
          <Button
            type="primary"
            className="bg-sidebarTheme hover:bg-navbarDashboard w-1/2 text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
            onClick={() => next()}
            disabled={products.length === 0 ? true : false}
          >
            تکمیل خرید
          </Button>
        ) : current === 3 ? (
          <Link href={"/"} className="flex justify-center items-center w-full">
            <Button
              type="primary"
              className="bg-sidebarTheme hover:bg-navbarDashboard w-1/2 text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
              onClick={() => message.success("Processing complete!")}
              disabled={products.length === 0 ? true : false}
            >
              فروشگاه
            </Button>
          </Link>
        ) : null}
        {current > 0 && (
          <span
            className="bg-transparent mx-[8px] border-none text-[16px] text-navbarDashboard underline cursor-pointer"
            onClick={() => prev()}
          >
            برگشت
          </span>
        )}
      </div>
    </div>
  );
}

export default StepPage;
