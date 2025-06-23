"use client";
import addToCard from "@/utils/addToCard";
import showNotification from "@/utils/notification";
import { Card, Image, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  PiHeartBold,
  PiMagnifyingGlassBold,
  PiBasketBold,
  PiTrashBold,
} from "react-icons/pi";

const Product = ({ name, price, img, id, userID }) => {
  const path = usePathname();
  const route = useRouter();

  const addToFavorite = () => {
    if (userID) {
      axios
        .post("/api/wishlist/create", {
          userID,
          productID: id,
        })
        .then((res) => {
          if (res.status === 201) {
            showNotification({
              type: "success",
              message: "پیغام",
              description: "محصول با موفقیت به علاقه مندی ها اضافه شد",
            });
            route.refresh();
          }
        })
        .catch((err) => {
          if (err.status === 403) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "کاربر یافت نشد",
            });
          } else if (err.status === 405) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "محصول یافت نشد",
            });
          } else if (err.status === 406) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "محصول از قبل در لیست علاقه مندی شما قرار دارد",
            });
          } else {
            showNotification({
              type: "error",
              message: "پیغام",
              description:
                "در اضافه کردن محصول به لیست علاقه مندی خطایی رخ داده",
            });
          }
        });
    } else {
      showNotification({
        type: "error",
        message: "پیغام",
        description: "ابتدا وارد حساب کاربری خود شوید",
      });
    }
  };

  const deleteFromFavorite = () => {
    if (userID) {
      axios
        .delete("/api/wishlist/delete", {
          data: {
            userID,
            productID: id,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            showNotification({
              type: "success",
              message: "پیغام",
              description: "محصول با موفقیت از علاقه مندی ها حذف شد",
            });
            location.reload();
          }
        })
        .catch((err) => {
          if (err.status === 403) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "کاربر یافت نشد",
            });
          } else if (err.status === 405) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "محصول یافت نشد",
            });
          } else if (err.status === 406) {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "محصول در لیست علاقه مندی شما قرار ندارد",
            });
          } else {
            showNotification({
              type: "error",
              message: "پیغام",
              description: "در حذف کردن محصول از لیست علاقه مندی خطایی رخ داده",
            });
          }
        });
    } else {
      showNotification({
        type: "error",
        message: "پیغام",
        description: "ابتدا وارد حساب کاربری خود شوید",
      });
    }
  };

  return (
    <>
      <Card
        className="mx-auto my-0 max-w-[300px] overflow-hidden duration-500"
        cover={
          <Image
            alt="cover"
            src={`/uploads/product/${img}`}
            fallback="/image/not-found.png"
            height={300}
            width={300}
            className="object-cover"
          />
        }
        actions={[
          <Tooltip
            title={
              path.includes("wishlist")
                ? "حذف از علاقه مندی ها"
                : "افزودن به علاقه مندی ها"
            }
            className="flex justify-center items-center"
          >
            {path.includes("wishlist") ? (
              <PiTrashBold
                key="trash"
                size={18}
                className="hover:text-[#000] transition-colors duration-300"
                onClick={deleteFromFavorite}
              />
            ) : (
              <PiHeartBold
                key="heart"
                size={18}
                className="hover:text-[#dc2626] transition-colors duration-300"
                onClick={addToFavorite}
              />
            )}
          </Tooltip>,
          <Tooltip
            title="مشاهده محصول"
            className="flex justify-center items-center"
          >
            <PiMagnifyingGlassBold
              key="magnify-glass"
              size={18}
              className="hover:text-[#000] transition-colors duration-300"
              onClick={() => route.replace(`/product/${id}`)}
            />
          </Tooltip>,
          <Tooltip
            title="افزودن به سبد خرید"
            className="flex justify-center items-center"
          >
            <PiBasketBold
              key="basket"
              size={18}
              className="hover:text-[#000] transition-colors duration-300"
              onClick={() => addToCard({ id, name, img, price, userID })}
            />
          </Tooltip>,
        ]}
        hoverable
      >
        <Meta
          title={name}
          description={<p className=""> {price.toLocaleString()} تومان </p>}
        />
      </Card>
    </>
  );
};

export default Product;
