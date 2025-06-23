"use client";
import React, { useEffect, useState } from "react";
import { ColorRingLoader, Loader } from "@/components/loading/product/Loader";
import { Rate, Tooltip, Button, Tabs, Image } from "antd";
import axios from "axios";
import {
  PiSmileyBold,
  PiSmileySadBold,
  PiHeartBold,
  PiMinusBold,
  PiPlusBold,
} from "react-icons/pi";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import InfoProduct from "../../info-product/InfoProduct";
import CommentsTab from "../../comments/CommentsTab";
import DescriptionTab from "../../description/DescriptionTab";
import Slider from "@/components/slider/effect-card/Slider";
import addToCard from "@/utils/addToCard";
import showNotification from "@/utils/notification";

function Detail({ id, user }) {
  const [product, setProduct] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [numberUser, setNumberUser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favoriteLoad, setFavoriteLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .post("/api/products/recive-accept", {
        productID: id,
      })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
          const data = res.data.comment;
          const totalPoints = data.reduce((a, b) => a + b.score, 0);
          const finalPoints = totalPoints / data.length;
          setScore(finalPoints);
          setNumberUser(data.length);
        }
      })
      .catch((err) => {
        err.status === 402
          ? setError("محصول یافت نشد")
          : setError("در پیدا کردن محصول مشکل به وجود امد");
      })
      .finally(() => setLoading(false));
  }, [score]);

  const ItemTabs = [
    {
      key: 1,
      label: "توضیحات",
      children: <DescriptionTab id={id} />,
    },
    {
      key: 2,
      label: "اطلاعات بیشتر",
      children: <InfoProduct id={id} />,
    },
    {
      key: 3,
      label: `نظرات (${numberUser})`,
      children: <CommentsTab id={id} user={user} />,
    },
  ];

  const addToWishlist = () => {
    setFavoriteLoad(true);
    axios
      .post("/api/wishlist/create", {
        userID: user.id,
        productID: id,
      })
      .then((res) => {
        if (res.status === 201) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "محصول با موفقیت به علاقه مندی ها اضافه شد",
          });
        }
      })
      .catch((err) => {
        if (err.status === 406) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "محصول از قبل در لیست علاقه مندی شما قرار دارد",
          });
        }
      })
      .finally(() => setFavoriteLoad(false));
  };
  return (
    <div
      className="gap-16 mx-auto px-6 desktop:px-[163px] laptop:px-[163px] mobile:px-6 tablet:px-6 pt-[150px] pb-[100px]"
      data-aos="fade-up"
    >
      <div
        className={
          error || loading
            ? "flex justify-center items-center w-full"
            : "grid grid-cols-1 mobile:grid-cols-1 gap-10 tablet:grid-cols-[30%_70%] laptop:grid-cols-[30%_70%] desktop:grid-cols-[30%_70%]"
        }
      >
        {loading && <Loader />}
        {error && (
          <p className="font-medium text-navbarDashboard text-2xl"> {error} </p>
        )}
        {!error && !loading && product.length === 0 && (
          <p className="font-medium text-navbarDashboard text-2xl">
            {" "}
            محصول یافت نشد{" "}
          </p>
        )}
        {!error && !loading && product && (
          <>
            <div className="rounded-[8px]">
              <Image
                alt="product"
                src={`/uploads/product/${product.img}`}
                onError={(e) => (e.target.src = "/image/not-found.png")}
                height={400}
                width={400}
                className="rounded-[8px] object-cover"
              />
            </div>
            <main className="flex flex-col gap-10 px-10">
              <section className="flex flex-col justify-start items-start gap-4 pb-12 border-b-2 border-b-sidebarTheme">
                <p> صفحه اصلی / محصولات / {product.name} </p>
                <p className="font-medium text-navbarDashboard text-xl">
                  {" "}
                  {product.name}{" "}
                </p>
                <div className="flex justify-center items-start gap-4">
                  <Rate disabled defaultValue={score} allowHalf />
                  <span className="font-medium text-navbarDashboard text-sm">
                    {" "}
                    تعداد امتیاز دهندگان ({numberUser}){" "}
                  </span>
                </div>
                <p className="font-medium text-navbarDashboard text-2xl">
                  {product.price.toLocaleString()} تومان
                </p>
                <p className="text-ls text-sidebarTheme line-clamp-3">
                  {product.shortDescription}
                </p>
              </section>
              <section className="flex flex-col justify-start items-start gap-4">
                <div className="flex justify-start items-center gap-3 w-full">
                  {product.number > 0 ? (
                    <>
                      <div className="flex justify-center items-center gap-1">
                        <PiSmileyBold color="#d2b48c" size={18} />
                        <p className="font-medium text-navbarDashboard text-sm">
                          {" "}
                          موجود در انبار{" "}
                        </p>
                      </div>
                      {favoriteLoad ? (
                        <div className="flex justify-start items-start w-full">
                          <ColorRingLoader />
                        </div>
                      ) : (
                        <Tooltip title="افزودن به علاقه مندی ها">
                          <PiHeartBold
                            size={20}
                            color="#d2b48c"
                            className="hover:text-[#dc2626] transition-colors duration-500 cursor-pointer"
                            onClick={addToWishlist}
                          />
                        </Tooltip>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center items-center gap-1">
                        <PiSmileySadBold color="#d2b48c" size={18} />
                        <p className="font-medium text-navbarDashboard text-sm">
                          {" "}
                          ناموجود{" "}
                        </p>
                      </div>
                      <Tooltip title="افزودن به علاقه مندی ها">
                        <PiHeartBold
                          size={20}
                          color="#d2b48c"
                          className="hover:text-[#dc2626] transition-colors duration-500 cursor-pointer"
                        />
                      </Tooltip>
                    </>
                  )}
                </div>
                <div className="w-full">
                  <span className="font-medium text-navbarDashboard text-lg">
                    {" "}
                    تگ ها :{" "}
                  </span>
                  {product.tags.map((tag) => (
                    <span className="font-medium text-navbarDashboard text-sm">
                      {" "}
                      {tag},{" "}
                    </span>
                  ))}
                </div>
                <div className="flex justify-start items-center gap-4 w-full">
                  <div className="flex justify-center items-center">
                    <Button
                      className="p-1 border-2 border-sidebarTheme rounded-tl-none rounded-bl-none"
                      icon={<PiMinusBold size={14} />}
                      onClick={() => {
                        count <= 0
                          ? setCount(0)
                          : setCount((prevCount) => prevCount - 1);
                      }}
                    ></Button>
                    <div className="px-[7px] py-[5px] border-2 border-sidebarTheme border-r-0 border-l-0 text-navbarDashboard text-sm text-center">
                      {count}
                    </div>
                    <Button
                      className="p-1 border-2 border-sidebarTheme rounded-tr-none rounded-br-none"
                      icon={<PiPlusBold size={14} />}
                      onClick={() => setCount((prevCount) => prevCount + 1)}
                    ></Button>
                  </div>
                  <GlobalBtn
                    title={"افزودن به سبد خرید"}
                    iconName={"PiBasketBold"}
                    model={1}
                    onClick={() =>
                      addToCard({
                        id: product.id,
                        userID: user.id,
                        name: product.name,
                        img: product.img,
                        price: product.price,
                        count: count === 0 ? 1 : count,
                      })
                    }
                  />
                </div>
              </section>
            </main>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-4 pt-20">
        {!loading && !error && product && (
          <>
            <div className="w-full">
              <Tabs defaultActiveKey="1" centered items={ItemTabs} />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-4 pt-14">
        {!loading && !error && product && (
          <>
            <p className="text-navbarDashboard text-xl text-center">
              {" "}
              محصولات مرتبط{" "}
            </p>
            <Slider productID={id} user={user} />
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
