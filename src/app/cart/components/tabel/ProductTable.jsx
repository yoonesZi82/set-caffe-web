"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Table, Result } from "antd";
import { PiTrashBold, PiMinusBold, PiPlusBold } from "react-icons/pi";
import GlobalBtn from "@/components/global-button/GlobalBtn";
const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    if (orders) {
      setCartData(orders);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const removeFromCard = (id) => {
    const updateOrders = cartData
      .map((order) => {
        if (order.id === id) {
          return null;
        }
        return order;
      })
      .filter(Boolean);
    localStorage.setItem("orders", JSON.stringify(updateOrders));
    setCartData(updateOrders);
  };

  const updateCount = (id, countNumber) => {
    const updateProducts = cartData.map((product) => {
      if (product.id === id) {
        const newCount = product.count + countNumber;
        return { ...product, count: Math.max(1, newCount) };
      }
      return product;
    });
    setCartData(updateProducts);
    if (typeof window !== "undefined") {
      localStorage.setItem("orders", JSON.stringify(updateProducts));
    }
  };

  const columns = [
    {
      title: "ردیف",
      render: (record, value, index) => index + 1,
      width: 70,
    },
    {
      title: "عکس محصول",
      dataIndex: "img",
      key: "img",
      width: 150,
      render: (_, record) => (
        <Avatar
          size="large"
          src={
            record.img
              ? `/uploads/product/${record.img}`
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
      title: "قیمت محصول",
      dataIndex: "price",
      key: "price",
      width: 350,
      render: (_, record) => {
        const price = record.count * record.price;
        return `${price.toLocaleString()} تومان`;
      },
    },
    {
      title: "تعداد",
      dataIndex: "count",
      key: "count",
      render: (text, record) => (
        <div className="flex justify-center items-center border-2 border-navbarDashboard hover:border-sidebarTheme rounded w-fit transition-colors duration-500">
          <Button
            className="bg-transparent hover:bg-sidebarTheme p-[8px] border-t-0 border-r-0 border-b-0 border-l-2 border-l-navbarDashboard rounded-none transition-colors duration-500"
            onClick={() => updateCount(record.id, -1)}
          >
            <PiMinusBold />
          </Button>
          <span className="px-[6px]"> {record.count} </span>
          <Button
            className="bg-transparent hover:bg-sidebarTheme p-[8px] border-t-0 border-r-2 border-r-navbarDashboard border-b-0 border-l-0 rounded-none transition-colors duration-500"
            onClick={() => updateCount(record.id, 1)}
          >
            <PiPlusBold />
          </Button>
        </div>
      ),
      width: 150,
    },
    {
      title: "حذف محصول",
      key: "delete",
      width: 150,
      render: (_, record) => (
        <PiTrashBold
          size={20}
          className="cursor-pointer"
          onClick={() => {
            showModal();
            setId(record.id);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Modal open={isModalOpen} onCancel={closeModal}>
        <Result
          status="warning"
          title="ایا از حذف این محصول از سبد خرید اطمینان دارید؟"
          extra={
            <div className="flex justify-center items-center gap-3 w-full">
              <GlobalBtn
                title="حذف"
                iconName="PiEraserBold"
                model={1}
                onClick={() => {
                  removeFromCard(id);
                  closeModal();
                }}
              />
              <GlobalBtn
                title="خیر"
                iconName="PiX"
                model={2}
                onClick={() => {
                  closeModal();
                }}
              />
            </div>
          }
        />
      </Modal>
      <Table
        columns={columns}
        dataSource={cartData}
        pagination={{ pageSize: 5 }}
        loading={loading}
        className="card-table"
      />
    </>
  );
};
export default ProductTable;
