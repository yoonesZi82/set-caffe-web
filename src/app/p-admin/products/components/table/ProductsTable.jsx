"use client";
import React, { useState } from "react";
import { Avatar, Table } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import axios from "axios";
import showNotification from "@/utils/notification";
import ShowModal from "@/components/Modal/ShowModal";
import { PiUserBold } from "react-icons/pi";

export default function ProductsTable({ products }) {
  const [isModal, setIsModal] = useState(false);
  const [loading, setLoading] = useState(null);
  const [allProducts, setAllProducts] = useState(products);
  const [id, setID] = useState(null);

  const deleteProduct = (productID) => {
    setLoading(true);
    axios
      .delete(`/api/products/delete`, {
        data: {
          productID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setAllProducts(
            allProducts.filter((product) => product.id !== productID)
          );
          showNotification({
            type: "success",
            message: "پیغام",
            description: " محصول با موفقیت حذف شد",
          });
        }
      })
      .catch((err) =>
        showNotification({
          type: "error",
          message: "پیغام",
          description: "مشکلی سمت سرور به وجود امده است",
        })
      )
      .finally(() => {
        setIsModal(false);
        setLoading(false);
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
      render: (_, record) => (
        <>
          {record.image ? (
            <Avatar
              size="large"
              src={`/uploads/product/${record.image}`}
              alt="profile"
              onError={(e) => {
                console.log(e);
              }}
            />
          ) : (
            <Avatar
              size="large"
              icon={<PiUserBold size={20} />}
              alt="profile"
            />
          )}
        </>
      ),
    },
    {
      title: "نام محصول",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "قیمت محصول",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <p> {record.price.toLocaleString()} تومان </p>,
    },
    {
      title: "توضیحات کوتاه",
      dataIndex: "shortDescription",
      key: "shortDescription",
      render: (_, record) => (
        <p className="line-clamp-2"> {record.shortDescription} </p>
      ),
    },
    {
      title: "وزن محصول",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "مناسب برای",
      dataIndex: "suitableFor",
      key: "suitableFor",
    },
    {
      title: "میزان بو",
      dataIndex: "smell",
      key: "smell",
    },
    {
      title: "تعداد محصول",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "کامنت های ثبت شده",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "حذف محصول",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <GlobalBtn
          iconName="PiTrashBold"
          style="pr-[10px]"
          model={1}
          loading={loading === record.key}
          onClick={() => {
            setID(record.key);
            setIsModal(true);
          }}
        />
      ),
    },
  ];

  const data = allProducts.map((product) => ({
    key: product.id,
    image: product.img,
    name: product.name,
    price: product.price,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    weight: product.weight,
    suitableFor: product.suitableFor,
    smell: product.smell,
    count: product.number,
    comments: product.comment.length,
  }));

  return (
    <>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.longDescription}</p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      <ShowModal
        open={isModal}
        onCancel={() => setIsModal(false)}
        status="warning"
        iconName={"PiXBold"}
        title="ایا از حذف محصول اطمینان دارید؟"
        titleBtn="حذف "
        operation={() => deleteProduct(id)}
        loading={loading}
      />
    </>
  );
}
