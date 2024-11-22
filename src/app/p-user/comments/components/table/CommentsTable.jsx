"use client";
import React from "react";
import { Avatar, Rate, Table } from "antd";

export default function CommentsTable({ comments }) {
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
      title: "امتیاز",
      dataIndex: "score",
      key: "score",
      render: (_, record) => (
        <Rate disabled defaultValue={record.score} allowHalf />
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 250,
      render: (_, record) => (
        <p className={record.status ? "text-green-600" : "text-red-500"}>
          {record.status ? "تاید شده" : "تایید نشده"}
        </p>
      ),
    },
  ];
  const data = comments.map((comment) => ({
    key: comment.id,
    name: comment.product.name,
    score: comment.score,
    image: comment.product.img,
    status: comment.isAccept ? true : false,
    description: comment.body,
  }));

  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 5 }}
      expandable={{
        expandedRowRender: (record) => (
          <p className="m-0">{record.description}</p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  );
}
