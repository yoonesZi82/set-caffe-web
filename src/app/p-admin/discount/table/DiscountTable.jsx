"use client";
import ShowModal from "@/components/Modal/ShowModal";
import showNotification from "@/utils/notification";
import { Button, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { PiTrashBold } from "react-icons/pi";

function DiscountTable({ discounts }) {
  const [allDiscounts, setAllDiscounts] = useState(discounts);
  const [discountID, setDiscountID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const deleteDiscount = () => {
    setLoading(true);
    axios
      .delete("/api/discounts/delete", {
        data: {
          id: discountID,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const newDiscounts = allDiscounts.filter(
            (discount) => discountID != discount.id
          );
          setAllDiscounts(newDiscounts);
          setIsModalOpen(false)
          showNotification({
            type: "success",
            message: "پیغام",
            description: "کد تخفیف با موفقیت حذف شد",
          });
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "مشکلی در سمت سرور وجود دارد",
        });
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "ردیف",
      render: (record, value, index) => index + 1,
      width: 70,
    },
    {
      title: "اسم کد",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "حداکثر تعداد استفاده",
      dataIndex: "maxUse",
      key: "maxUse",
    },
    {
      title: "تعداد استفاده شده",
      dataIndex: "uses",
      key: "uses",
    },
    {
      title: "میزان تخفیف",
      dataIndex: "percent",
      key: "percent",
      render: (_, record) => (
        <p> {record ? `${record.percent} درصد` : null} </p>
      ),
    },
    {
      title: "نوع تخفیف",
      dataIndex: "access",
      key: "access",
      render: (_, record) => <>{record.access === 1 ? "خصوصی" : "عمومی"}</>,
    },
    {
      title: "حذف",
      dataIndex: "trash",
      key: "trash",
      render: (_, record) => (
        <Button
          className="bg-sidebarTheme hover:bg-navbarDashboard p-5 border-none rounded-[8px] text-navbarDashboard hover:text-sidebarTheme transition-colors duration-500"
          icon={<PiTrashBold size={20} />}
          loading={loading === record.key}
          onClick={() => {
            setIsModalOpen(true);
            setDiscountID(record.key);
          }}
        ></Button>
      ),
    },
  ];

  const data = allDiscounts.map((discount) => ({
    key: discount.id,
    code: discount.code,
    percent: discount.percent,
    maxUse: discount.maxUse,
    uses: discount.uses,
    access: discount.access,
  }));

  return (
    <>
      <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={data} />
      <ShowModal
        title={"ایا از حذف کد تخفیف اطمینان دارید؟"}
        titleBtn={"حذف"}
        iconName={"PiTrashBold"}
        onCancel={closeModal}
        open={isModalOpen}
        status={"warning"}
        loading={loading}
        operation={deleteDiscount}
      />
    </>
  );
}

export default DiscountTable;
