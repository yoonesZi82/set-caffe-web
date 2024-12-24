"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Avatar, Badge, Tooltip } from "antd";
import Link from "next/link";
import {
  PiUserBold,
  PiBellRingingBold,
  PiArrowFatLineLeftBold,
  PiArrowFatLineRightBold,
  PiSignOutBold,
  PiArticleBold,
  PiHouseLineBold,
  PiBasketBold,
  PiChatCircleTextBold,
  PiChatTextBold,
  PiHeartBold,
  PiPaperPlaneTiltBold,
  PiShieldCheckBold,
  PiUserListBold,
  PiFolderPlusBold,
  PiPercentBold,
  PiSealPercent,
} from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import DynamicBreadcrumb from "../breadcrump2/NewBreadcump";
import ShowModal from "../Modal/ShowModal";
import axios from "axios";
import showNotification from "@/utils/notification";
const { Header, Content, Sider } = Layout;

function DashboardLayout({ howUser, user, children }) {
  const path = usePathname();
  const route = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("home");
  const [sidebarItem, setSidebarItem] = useState([]);

  useEffect(() => {
    const adminItem = [
      {
        key: "counter",
        label: "پیشخوان",
        icon: <PiArticleBold size={20} />,
        children: [
          {
            key: "children-counter",
            type: "group",
            children: [
              {
                key: "home",
                icon: <PiHouseLineBold size={20} />,
                label: <Link href="/p-admin"> صفحه اصلی </Link>,
              },
              {
                key: "orders",
                icon: <PiBasketBold size={20} />,
                label: <Link href="/p-admin/orders"> سفارشات </Link>,
              },
              {
                key: "comments",
                icon: <PiChatCircleTextBold size={20} />,
                label: <Link href="/p-admin/comments"> کامنت ها </Link>,
              },
              {
                key: "products",
                icon: <PiHouseLineBold size={20} />,
                label: <Link href="/p-admin/products"> محصولات </Link>,
              },
              {
                key: "new-product",
                icon: <PiFolderPlusBold size={20} />,
                label: <Link href="/p-admin/new-product"> افزودن محصول</Link>,
              },
              {
                key: "users",
                icon: <PiUserListBold size={20} />,
                label: <Link href="/p-admin/users"> کاربران </Link>,
              },
              {
                key: "account",
                icon: <PiUserBold size={20} />,
                label: <Link href="/p-admin/account"> حساب کاربری </Link>,
              },
            ],
          },
        ],
      },
      {
        key: "percent",
        label: "کدتخفیف",
        icon: <PiSealPercent size={20} />,
        children: [
          {
            key: "children-counter",
            type: "group",
            children: [
              {
                key: "new-discount",
                icon: <PiPercentBold size={20} />,
                label: (
                  <Link href="/p-admin/new-discount"> ایجاد کدتخفیف </Link>
                ),
              },
              {
                key: "discount",
                icon: <PiPercentBold size={20} />,
                label: <Link href="/p-admin/discount"> کدهای تخفیف </Link>,
              },
            ],
          },
        ],
      },
      {
        key: "ticket",
        label: "تیکت ها",
        icon: <PiChatTextBold size={20} />,
        children: [
          {
            key: "children-ticket",
            type: "group",
            children: [
              {
                key: "all-tickets",
                icon: <PiChatTextBold size={20} />,
                label: <Link href="/p-admin/tickets"> تیکت های دریافتی </Link>,
              },
            ],
          },
        ],
      },
      {
        key: "p-user",
        icon: <PiUserBold size={20} />,
        label: <Link href="/p-user"> پنل کاربری</Link>,
      },
      {
        key: "market",
        icon: <PiBasketBold size={20} />,
        label: <Link href="/category"> فروشگاه</Link>,
      },
    ];

    const userItem = [
      {
        key: "counter",
        label: "پیشخوان",
        icon: <PiArticleBold size={20} />,
        children: [
          {
            key: "children-counter",
            type: "group",
            children: [
              {
                key: "home",
                icon: <PiHouseLineBold size={20} />,
                label: <Link href="/p-user"> صفحه اصلی </Link>,
              },
              {
                key: "orders",
                icon: <PiBasketBold size={20} />,
                label: <Link href="/p-user/orders"> سفارش ها </Link>,
              },
              {
                key: "comments",
                icon: <PiChatCircleTextBold size={20} />,
                label: <Link href="/p-user/comments"> کامنت ها </Link>,
              },
              {
                key: "favorites",
                icon: <PiHeartBold size={20} />,
                label: <Link href="/p-user/wishlist"> علاقه مندی ها </Link>,
              },
              {
                key: "account",
                icon: <PiUserBold size={20} />,
                label: <Link href="/p-user/account"> حساب کاربری </Link>,
              },
            ],
          },
        ],
      },
      {
        key: "ticket",
        label: "تیکت ها",
        icon: <PiChatTextBold size={20} />,
        children: [
          {
            key: "children-ticket",
            type: "group",
            children: [
              {
                key: "send-ticket",
                icon: <PiPaperPlaneTiltBold size={20} />,
                label: (
                  <Link href="/p-user/tickets/sendTicket"> ارسال تیکت</Link>
                ),
              },
              {
                key: "all-tickets",
                icon: <PiChatTextBold size={20} />,
                label: <Link href="/p-user/tickets"> تیکت های ارسالی </Link>,
              },
            ],
          },
        ],
      },
      howUser === "ADMIN"
        ? {
            key: "panel-admin",
            icon: <PiShieldCheckBold size={20} />,
            label: <Link href="/p-admin"> پنل مدیریت </Link>,
          }
        : null,
      {
        key: "market",
        icon: <PiBasketBold size={20} />,
        label: <Link href="/category"> فروشگاه</Link>,
      },
    ];

    setSidebarItem(path.includes("/p-admin") ? adminItem : userItem);
  }, [path, howUser]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const changeCurrent = (e) => {
    setCurrent(e.key);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };
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
          route.replace("/");
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "هنگام خروج از حساب مشکلی به وجود امده است",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Layout className="w-screen h-screen">
        <Header className="flex items-center p-0">
          <div className="desktop:w-[15%] laptop:w-[23%] flex justify-center items-center bg-navbarDashboard w-[66%] mobile:w-[66%] tablet:w-[38%] h-full">
            <p className="text-base text-white">
              {user ? user.name : "نام"} عزیز خوش اومدی
            </p>
          </div>
          <div className="flex justify-between items-center bg-navbarDashboard pl-8 w-full">
            <div className="flex gap-[12px]">
              <div>
                {user.image ? (
                  <Avatar size={50} src={`/uploads/account/${user.image}`} />
                ) : (
                  <Avatar size={50} icon={<PiUserBold />} />
                )}
              </div>
              <ul className="flex flex-col justify-center items-center gap-[1px]">
                <li className="text-lg text-white">
                  {" "}
                  {user ? user.name : "نام"}{" "}
                </li>
                <li className="text-sidebarTheme text-sm">
                  {" "}
                  {user
                    ? user.role === "ADMIN"
                      ? "ادمین"
                      : "کاربر"
                    : "کاربر ست کافی"}{" "}
                </li>
              </ul>
            </div>
            <Badge
              count={5}
              className="mt-1 text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
            >
              <Button
                shape="square"
                size="large"
                className="bg-sidebarTheme hover:bg-navbarDashboard text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
                icon={<PiBellRingingBold size={20} />}
              />
            </Badge>
          </div>
        </Header>
        <Layout>
          <Sider
            className="bg-[#808080] w-[200px]"
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="flex flex-col justify-between bg-sidebarTheme h-[96%] sidebar">
              <Menu
                onClick={changeCurrent}
                mode="inline"
                selectedKeys={[current]}
                defaultSelectedKeys={current}
                className="border-r-0 h-full"
                inlineCollapsed={collapsed}
                items={sidebarItem}
              />
              {collapsed ? (
                <Tooltip title="خروج از حساب" placement="left">
                  <Button
                    icon={<PiSignOutBold size={20} />}
                    className="bg-navbarDashboard hover:bg-sidebarTheme mx-auto my-0 border-none rounded-[8px] w-[70%] text-sidebarTheme hover:text-navbarDashboard transition-colors duration-500 outline-none"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {collapsed ? null : "خروج از حساب"}
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  icon={<PiSignOutBold size={20} />}
                  className="bg-navbarDashboard hover:bg-sidebarTheme mx-auto my-0 border-none rounded-[8px] w-[70%] text-sidebarTheme hover:text-navbarDashboard transition-colors duration-500 outline-none"
                  onClick={() => setIsModalOpen(true)}
                >
                  {collapsed ? null : "خروج از حساب"}
                </Button>
              )}
            </div>
          </Sider>

          <Layout className="px-6 pt-0 pb-6">
            <div className="flex justify-start items-center gap-2 py-[14px] w-full">
              <Button
                onClick={toggleCollapsed}
                className="bg-sidebarTheme hover:bg-navbarDashboard border-none text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500 outline-none"
              >
                {collapsed ? (
                  <PiArrowFatLineLeftBold size={20} />
                ) : (
                  <PiArrowFatLineRightBold size={20} />
                )}
              </Button>
              <DynamicBreadcrumb />
            </div>
            <Content className="bg-[#f4f4f4] shadow-[10px_10px_20px_#babecc,-10px_-10px_20px_#ffffff] m-0 p-6 rounded-[8px] max-w-[1288px] min-h-[280px] max-h-[600px] overflow-x-auto overflow-y-auto">
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <ShowModal
        open={isModalOpen}
        onCancel={onCancel}
        status={"warning"}
        title={"ایا از خارج شدن از حساب خود اطمینان دارید؟"}
        titleBtn={"خروج"}
        operation={() => signOut()}
        loading={loading}
        iconName={"PiSignOut"}
      />
    </>
  );
}

export default DashboardLayout;
