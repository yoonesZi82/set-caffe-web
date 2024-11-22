"use client";
import React, { useState } from "react";
import { Modal, Table } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import axios from "axios";
import showNotification from "@/utils/notification";
import NameInput from "@/components/form/input/NameInput";
import Form from "../answer-form/From";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AnswerSchema from "../answer-form/answer-schema/schema";

export default function TicketsTable({ tickets }) {
  const [loading, setLoading] = useState(false);
  const [isModalAnswerOpen, setIsModalAnswerOpen] = useState(false);
  const [isModalWrightOpen, setIsModalWrightOpen] = useState(false);
  const [error, setError] = useState("");
  const [answerTicket, setAnswerTicket] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [localTickets, setLocalTickets] = useState(tickets);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AnswerSchema),
  });

  const showModalAnswer = () => {
    setIsModalAnswerOpen(true);
  };
  const showModalWrightAnswer = () => {
    setIsModalWrightOpen(true);
  };
  const handleCancel = ({ modal }) => {
    if (modal === "answer") {
      setIsModalAnswerOpen(false);
    } else {
      setIsModalWrightOpen(false);
    }
  };

  const sendAnswer = (data) => {
    setLoading(true);
    axios
      .put("/api/tickets/answer", {
        ticketID: selectedTicketId,
        answer: data.answer,
      })
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "پاسخ شما با موفقیت ثبت شد",
          });
          setLocalTickets((prevTickets) =>
            prevTickets.map((ticket) =>
              ticket.id === selectedTicketId
                ? { ...ticket, answer: data.answer, hasAnswer: true }
                : ticket
            )
          );
          setIsModalWrightOpen(false);
          reset();
        }
      })
      .catch((err) => {
        setError("هنگام دادن پاسخ خطایی رخ داده است");
        showNotification({
          type: "error",
          message: "پیغام",
          description: "هنگام دادن پاسخ خطایی رخ داده است",
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
      title: "نام کاربر",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "موضوع تیکت",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "دپارتمان",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "واحد پشتیبانی",
      dataIndex: "subdepartment",
      key: "subdepartment",
    },
    {
      title: "پاسخ",
      dataIndex: "newAnswer",
      key: "newAnswer",
      render: (_, record) => (
        <>
          {record.answer ? (
            <GlobalBtn
              model={1}
              iconName={"PiEyeBold"}
              title={"مشاهده پاسخ"}
              loading={loading}
              onClick={() => {
                setAnswerTicket(record.answer);
                showModalAnswer();
              }}
            />
          ) : (
            <GlobalBtn
              model={1}
              iconName={"PiPencilLineBold"}
              title={"دادن پاسخ"}
              loading={loading}
              onClick={() => {
                setSelectedTicketId(record.key);
                showModalWrightAnswer();
              }}
            />
          )}
        </>
      ),
    },
    {
      title: "وضغیت",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.hasAnswer ? (
            <p className="text-green-600"> پاسخ داده شده </p>
          ) : (
            <p className="text-red-500"> پاسخ داده نشده </p>
          )}
        </>
      ),
    },
  ];

  const data = localTickets.map((ticket) => ({
    key: ticket.id,
    username: ticket.user.name,
    department: ticket.department.title,
    subdepartment: ticket.subdepartment.title,
    title: ticket.title,
    message: ticket.body,
    hasAnswer: ticket.hasAnswer,
    answer: ticket.answer,
  }));

  return (
    <>
      <Modal
        title="پاسخ خود را وارد کنید"
        open={isModalWrightOpen}
        footer={null}
        onCancel={() => handleCancel({ modal: "wright" })}
      >
        <Form
          handelSubmit={handleSubmit(sendAnswer)}
          error={error}
          loading={loading}
        >
          <div className="flex flex-col gap-3">
            <NameInput
              placeholder="پاسخ"
              name="answer"
              control={control}
              error={errors.answer?.message}
            />
          </div>
        </Form>
      </Modal>
      <Modal
        title="مشاهده پاسخ"
        open={isModalAnswerOpen}
        footer={null}
        onCancel={() => handleCancel({ modal: "answer" })}
      >
        <div className="flex justify-center items-center p-6 w-full">
          <p className="text-navbarDashboard">{answerTicket}</p>
        </div>
      </Modal>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        expandable={{
          expandedRowRender: (record) => (
            <p className="m-0">{record.message}</p>
          ),
          rowExpandable: (record) => record.username !== "Not Expandable",
        }}
        dataSource={data}
      />
    </>
  );
}
