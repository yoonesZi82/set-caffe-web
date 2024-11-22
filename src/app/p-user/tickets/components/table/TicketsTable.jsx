"use client";
import React from "react";
import { Table } from "antd";

export default function TicketsTable({ tickets }) {
  const columns = [
    {
      title: "ردیف",
      render: (record, value, index) => index + 1,
      width: 70,
    },
    {
      title: "موضوع ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "دپارتمان ",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "واحد ",
      dataIndex: "subdepartment",
      key: "subdepartment",
    },
    {
      title: "پیام",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "ضروریت",
      dataIndex: "piority",
      key: "piority",
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 250,
      render: (_, record) => (
        <p className={record.status ? "text-green-600" : "text-red-500"}>
          {record.status ? "پاسخ داده شده" : "پاسخ داده نشده"}
        </p>
      ),
    },
  ];
  const data = tickets.map((ticket) => ({
    key: ticket.id,
    department: ticket.department.title,
    subdepartment: ticket.subdepartment.title,
    title: ticket.title,
    message: ticket.body,
    piority:
      ticket.piority === 1 ? "ضروری" : ticket.piority === 2 ? "عادی" : "کم",
    status: ticket.hasAnswer,
    description: ticket.answer,
  }));

  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 5 }}
      expandable={{
        expandedRowRender: (record) => (
          <p className="m-0"> {record.description} </p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  );
}
