import React from "react";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();

  // translate to farsi
  const labelsMap = {
    home: "صفحه اصلی",
    "p-admin": "صفحه اصلی پنل",
    "p-user": "صفحه اصلی پنل",
    "new-product": "ایجاد محصول جدید",
    "new-discount": "ایجاد کدتخفیف",
    products: "محصولات",
    tickets: "تیکت ها",
    detail: "جزئیات",
    about: "درباره ما",
    contact: "تماس با ما",
    comments: "کامنت ها",
    wishlist: "علاقه مندی ها",
    account: "حساب کاربری",
    users: "کاربران",
    orders: "سفارش ها",
    sendTicket: "ارسال تیکت",
    discount: "کدهای تخفیف",
  };

  // get way
  const pathParts = pathname.split("/").filter((part) => part);

  // create array way
  const routes = pathParts.map((part, index) => {
    const link = "/" + pathParts.slice(0, index + 1).join("/");
    return { label: labelsMap[part] || part, link };
  });

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">{labelsMap["home"]}</a>
      </Breadcrumb.Item>
      {routes.map((route, index) => (
        <Breadcrumb.Item key={index}>
          {index === routes.length - 1 ? (
            route.label
          ) : (
            <Link href={route.link}>{route.label}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
