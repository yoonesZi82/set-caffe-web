"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Badge, Menu } from "antd";
import {
  PiBasketBold,
  PiArticleBold,
  PiCoffeeBold,
  PiUserBold,
  PiPhoneCallBold,
  PiHouseLineBold,
  PiProhibitBold,
  PiHeartBold,
  PiChatTextBold,
  PiChatCircleTextBold,
  PiSignOutBold,
} from "react-icons/pi";
import ShowModal from "@/components/Modal/ShowModal";
import axios from "axios";
import showNotification from "@/utils/notification";

function Navbar({ isLogin }) {
  const [user, setUser] = useState(isLogin);
  const [fixTop, setFixTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders"));
    if (allOrders) {
      setOrders(allOrders);
    } else {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };
    window.addEventListener("scroll", fixNavbarToTop);

    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  useEffect(() => {
    axios
      .post("/api/user/wishlist", {
        userID: user.id,
      })
      .then((res) => res.status === 200 && setWishlist(res.data))
      .catch((err) => {
        err.status === 402
          ? setError("شما هنوز وارد حساب خود نشده اید")
          : setError("مشکلی در پیدا کردن علاقه مندی ها وجود دارد");
      });
  }, []);

  const signOut = () => {
    setLoading(true);
    axios
      .post("/api/auth/signout")
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "با موفقیت از حساب خود خارج شدید",
          });
          location.reload();
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "هنگام خروج از حساب مشکلی به وجود امده است",
        });
      })
      .finally(() => {
        setLoading(false);
        setIsModalOpen(false);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      label: <Link href={"/"}>صفحه اصلی</Link>,
      key: "home",
      icon: <PiHouseLineBold />,
    },
    {
      label: <Link href={"/category"}>فروشگاه</Link>,
      key: "store",
      icon: <PiBasketBold />,
    },
    {
      label: <Link href={"/blogs"}>وبلاگ ها</Link>,
      key: "blogs",
      icon: <PiArticleBold />,
    },
    {
      label: <Link href={"/cafe-dictionary"}>دیکشنری قهوه</Link>,
      key: "translate-cafe",
      icon: <PiArticleBold />,
    },
    {
      label: <Link href={"/contact-us"}>تماس با ما</Link>,
      key: "call-us",
      icon: <PiPhoneCallBold />,
    },
    {
      label: <Link href={"/about-us"}>درباره ما</Link>,
      key: "about-us",
      icon: <PiCoffeeBold />,
    },
    {
      label: <Link href={"/rules"}>قوانین</Link>,
      key: "roles",
      icon: <PiProhibitBold />,
    },
    {
      label: (
        <>
          {!user ? (
            <Link href={"/login-register"}>ثبت نام / ورود</Link>
          ) : (
            <Link href={"/p-user"}>حساب کاربری</Link>
          )}
        </>
      ),
      key: "register",
      icon: <PiUserBold />,
      children: !user
        ? null
        : [
            {
              type: "group",
              label: user.name,
              children: [
                {
                  label: <Link href="p-user/orders"> سفارشات </Link>,
                  key: "orders",
                  icon: <PiBasketBold />,
                },
                {
                  label: <Link href="p-user/tickets">تیکت ها </Link>,
                  key: "tickets",
                  icon: <PiChatTextBold />,
                },
                {
                  label: <Link href="p-user/comments"> کامنت ها </Link>,
                  key: "comments",
                  icon: <PiChatCircleTextBold />,
                },
                {
                  label: <Link href="p-user/wishlist"> علاقه مندی ها </Link>,
                  key: "wishlists",
                  icon: <PiHeartBold />,
                },
                {
                  label: <Link href="p-user/account"> جزیات حساب </Link>,
                  key: "account",
                  icon: <PiUserBold />,
                },
                {
                  label: <p onClick={showModal}>خروج از حساب کاربری</p>,
                  key: "sign-out",
                  icon: <PiSignOutBold />,
                },
              ],
            },
          ],
    },
  ];

  return (
    <>
      <div
        className={
          !fixTop
            ? "w-full absolute z-[1000] px-2 before:block before:h-[30px]"
            : "w-full fixed shadow-[0_1px_8px_rgba(0,0,0,0.1)] left-0 top-0 bg-sidebarTheme z-[1000] navbar-animate"
        }
      >
        <main
          className={
            !fixTop
              ? "transition-colors duration-200 bg-sidebarTheme shadow-[0_1px_8px_rgba(0,0,0,0.1)] text-navbarDashboard flex px-[30px] h-[90px] items-center mx-auto my-0 max-w-[1192px] z-[999] justify-between rounded-lg"
              : "h-[73px] shadow-none transition-colors duration-200 bg-sidebarTheme text-navbarDashboard flex px-[30px] items-center mx-auto my-0 max-w-[1192px] z-[999] justify-between"
          }
        >
          <div className="flex justify-around items-center gap-8 mt-1 text-xl">
            <Link href="/cart">
              <Badge count={orders.length > 0 ? orders.length : 0}>
                <PiBasketBold size={20} />
              </Badge>
            </Link>
            <Link href="/wishlist">
              <Badge count={wishlist.length > 0 ? wishlist.length : 0}>
                <PiHeartBold size={20} />
              </Badge>
            </Link>
          </div>
          <Menu
            mode="horizontal"
            items={items}
            className="justify-center items-center bg-sidebarTheme shadow-none border-b border-b-none w-[50%] desktop:w-[75%] laptop:w-[75%] mobile:w-[50%] tablet:w-[70%]"
          />
          <div>
            <img src="/image/logo.png" alt="Logo" />
          </div>
        </main>
      </div>
      <ShowModal
        open={isModalOpen}
        onCancel={handleCancel}
        status={"warning"}
        title={"ایا میخواهید از حساب خود خارج شوید؟"}
        titleBtn={"خروج از حساب"}
        operation={signOut}
        loading={loading}
        iconName={"PiSignOutBold"}
      />
    </>
  );
}

export default Navbar;
