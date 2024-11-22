"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Rate, Table } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import axios from "axios";
import showNotification from "@/utils/notification";
import classNames from "classnames";
import ShowModal from "@/components/Modal/ShowModal";

export default function CommentsTable({ comments }) {
  // stay of comments isAccept is true
  const [approvedComments, setApprovedComments] = useState(
    comments.reduce((acc, comment) => {
      acc[comment.id] = comment.isAccept;
      return acc;
    }, {})
  );
  const [loadingBan, setLoadingBan] = useState(null);
  const [loadingAccept, setLoadingAccept] = useState(null);
  const [bannedUsers, setBannedUsers] = useState({});
  const [acceptCommentModal, setAcceptCommentModal] = useState(false);
  const [banUserModal, setBanUserModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initialBannedState = {};
    comments.forEach((comment) => {
      initialBannedState[comment.id] = comment.user.isBan;
    });
    setBannedUsers(initialBannedState);
  }, [comments]);

  const handleCancel = ({ modal }) => {
    if (modal === "ban") {
      setBanUserModal(false);
    } else {
      setAcceptCommentModal(false);
    }
  };

  const banUserOrUnBan = ({ id, userID }) => {
    setLoadingBan(userID);
    const newBanStatus = !bannedUsers[id];
    axios
      .put("/api/user/ban", { userID, isBan: newBanStatus })
      .then((res) => {
        if (res.status === 200) {
          setBannedUsers((prev) => ({ ...prev, [id]: newBanStatus }));
          showNotification({
            type: "success",
            message: "پیغام",
            description: newBanStatus
              ? "کاربر با موفقیت بن شد"
              : "کاربر با موفقیت انبن شد",
          });
          setBanUserModal(false);
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "هنگام عملیات خطایی رخ داد",
        });
      })
      .finally(() => {
        setLoadingBan(null);
      });
  };

  const acceptComment = (id) => {
    setLoadingAccept(id);
    axios
      .put(`/api/comments/update`, { id })
      .then((res) => {
        if (res.status === 200) {
          setApprovedComments((prev) => ({
            ...prev,
            [id]: true,
          }));
          showNotification({
            type: "success",
            message: "پیغام",
            description: "کامنت با موفقیت پذیرفته شد",
          });
          setAcceptCommentModal(false);
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "در باره پذیرفتن کامنت خطایی رخ داد",
        });
      })
      .finally(() => {
        setLoadingAccept(null);
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
      title: "نام کاربر",
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
      title: "بن / انبن",
      dataIndex: "ban",
      key: "ban",
      render: (_, record) => (
        <GlobalBtn
          onClick={() => {
            setBanUserModal(true);
            setUserId(record.userID);
            setCommentId(record.key);
          }}
          model={1}
          iconName={bannedUsers[record.key] ? "PiXBold" : "PiProhibitBold"}
          title={bannedUsers[record.key] ? "خارج کردن از بن" : "بن کردن"}
          loading={loadingBan === record.userID}
        />
      ),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      key: "status",
      width: 250,
      render: (_, record) => (
        <>
          {approvedComments[record.key] ? (
            <p className="text-green-600">تایید شده</p>
          ) : (
            <GlobalBtn
              onClick={() => {
                setAcceptCommentModal(true);
                setCommentId(record.key);
              }}
              title={"تایید کردن"}
              model={1}
              loading={loadingAccept === record.key}
              iconName={"PiCheckBold"}
            />
          )}
        </>
      ),
    },
  ];

  const data = comments.map((comment) => ({
    key: comment.id,
    name: comment.user.name,
    score: comment.score,
    image: comment.product.img,
    userID: comment.user.id,
    description: comment.body,
  }));

  return (
    <>
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
        rowClassName={(record) =>
          classNames({
            "opacity-50": bannedUsers[record.key],
          })
        }
      />
      <ShowModal
        open={acceptCommentModal}
        onCancel={() => handleCancel({ modal: "accept" })}
        status="warning"
        title="ایا از تایید کامنت مطمئن هستید؟"
        titleBtn="تایید کردن"
        iconName={"PiCheckBold"}
        operation={() => acceptComment(commentId)}
        loading={loadingAccept === commentId}
      />
      <ShowModal
        open={banUserModal}
        onCancel={() => handleCancel({ modal: "ban" })}
        status="warning"
        iconName={bannedUsers[commentId] ? "PiXBold" : "PiProhibitBold"}
        title={
          bannedUsers[commentId]
            ? "ایا از انبن کردن کاربر مطمئن هستید؟"
            : "ایا از بن کردن کاربر مطمئن هستید؟"
        }
        titleBtn={bannedUsers[commentId] ? "انبن کردن" : "بن کردن"}
        operation={() => banUserOrUnBan({ id: commentId, userID: userId })}
        loading={loadingBan === userId}
      />
    </>
  );
}
