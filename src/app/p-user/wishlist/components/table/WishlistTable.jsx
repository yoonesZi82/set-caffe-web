"use client";
import React, { useState } from "react";
import { Avatar, Table } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import axios from "axios";
import showNotification from "@/utils/notification";

export default function WishlistTable({ wishlists, user }) {
  const [loading, setLoading] = useState(null);
  const [localWishlists, setLocalWishlists] = useState(wishlists || []);
  const deleteWishlist = (productID) => {
    setLoading(productID);
    axios
      .delete("/api/wishlist/delete", {
        data: {
          userID: user.id,
          productID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "محصول با موفقیت از علاقه مندی ها حذف شد",
          });
          const updatedWishlists = localWishlists.filter(
            (item) => item.product.id !== productID
          );
          setLocalWishlists(updatedWishlists);
        }
      })
      .catch((err) => {
        if (err) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "حذف محصول از علاقه مندی ها با مشکل مواجه شد",
          });
        }
      })
      .finally(() => {
        setLoading(null);
      });
  };
  const columns = [
    {
      title: "ردیف",
      render: (record, value, index) => index + 1,
      width: 70,
    },
    {
      title: "عکس محصول",
      dataIndex: "image",
      key: "image",
      width: 150,
      render: (_, record) => (
        <Avatar
          size="large"
          src={
            record.image
              ? `/uploads/product/${record.image}`
              : "/image/not-found.png"
          }
          alt="product"
        />
      ),
    },
    {
      title: "نام محصول",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "قمیت محصول",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p>{record.price.toLocaleString()} تومان</p>,
    },
    {
      title: "وزن محصول",
      dataIndex: "weight",
      key: "weight",
      render: (_, record) => <p>{record.weight} گرم</p>,
    },
    {
      title: "میزان بو",
      dataIndex: "smell",
      key: "smell",
    },
    {
      title: "مناسب برای",
      dataIndex: "suitableFor",
      key: "suitableFor",
    },
    {
      title: "مشاهده / حذف",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-start items-center gap-2">
          <GlobalBtn
            model={1}
            title={"مشاهده"}
            iconName={"PiEyeBold"}
            link={`/product/${record.key}`}
          />
          <GlobalBtn
            model={2}
            title={"حذف"}
            iconName={"PiTrashBold"}
            onClick={() => deleteWishlist(record.key)}
            loading={loading === record.key}
          />
        </div>
      ),
    },
  ];
  const data = localWishlists.map((wishlist) => ({
    key: wishlist.product.id,
    name: wishlist.product.name,
    price: wishlist.product.price,
    image: wishlist.product.img,
    weight: wishlist.product.weight,
    smell: wishlist.product.smell,
    suitableFor: wishlist.product.suitableFor,
    description: wishlist.product.longDescription,
  }));

  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 5 }}
      expandable={{
        expandedRowRender: (record) => (
          <p className="m-0 text-navbarDashboard line-clamp-2">
            {record.description}
          </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  );
}
