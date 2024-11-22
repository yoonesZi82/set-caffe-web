"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Table } from "antd";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import axios from "axios";
import showNotification from "@/utils/notification";
import classNames from "classnames";
import ShowModal from "@/components/Modal/ShowModal";

export default function UsersTable({ users }) {
  const [loading, setLoading] = useState(null);
  const [loadingBan, setLoadingBan] = useState(null);
  const [bannedUsers, setBannedUsers] = useState({});
  const [banUserModal, setBanUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userRoles, setUserRoles] = useState({});

  useEffect(() => {
    const initialBannedState = {};
    users.forEach((user) => {
      initialBannedState[user.id] = user.isBan;
    });
    setBannedUsers(initialBannedState);
  }, [users]);

  useEffect(() => {
    const initialRoles = {};
    users.forEach((user) => {
      initialRoles[user.id] = user.role;
    });
    setUserRoles(initialRoles);
  }, [users]);

  const banUserOrUnBan = (userID) => {
    setLoadingBan(userID);
    const newBanStatus = !bannedUsers[userID];
    axios
      .put("/api/user/ban", {
        userID,
        isBan: newBanStatus,
      })
      .then((res) => {
        if (res.status === 200) {
          setBannedUsers((prev) => ({ ...prev, [userID]: newBanStatus }));
          showNotification({
            type: "success",
            message: "پیغام",
            description: newBanStatus
              ? "کاربر با موفقیت بن شد"
              : "کاربر با موفقیت انبن شد",
          });
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "هنگام عملیات خطایی رخ داده است",
        });
      })
      .finally(() => {
        setLoadingBan(null);
        setBanUserModal(false);
      });
  };

  const changeRole = (userID) => {
    const newRole = userRoles[userID] === "ADMIN" ? "USER" : "ADMIN";
    setLoading(userID);
    axios
      .put("/api/user/role", { userID })
      .then((res) => {
        if (res.status === 200) {
          setUserRoles((prevRoles) => ({ ...prevRoles, [userID]: newRole }));
          showNotification({
            type: "success",
            message: "پیغام",
            description: "سطح کاربر با موفقیت تغییر کرد",
          });
        }
      })
      .catch((err) => {
        showNotification({
          type: "error",
          message: "پیغام",
          description: "در تغییر سطح کاربر مشکی به وجود امد",
        });
      })
      .finally(() => setLoading(null));
  };

  const columns = [
    {
      title: "ردیف",
      render: (record, value, index) => index + 1,
      width: 70,
    },
    {
      title: "پروفایل کاربر",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          {record.image ? (
            <Avatar
              size="large"
              src={`/uploads/account/${record.image}`}
              alt="profile"
            />
          ) : (
            <p> بدون پروفایل </p>
          )}
        </>
      ),
    },
    {
      title: "نام کاربر",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ایمیل کاربر",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "شماره تلفن کاربر",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "نام کاربر",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "سطح کاربر",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <>
          {userRoles[record.key] === "ADMIN" ? <p> ادمین </p> : <p>کاربر </p>}
        </>
      ),
    },
    {
      title: "تعداد کامنت ها",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "تعداد تیکت ها",
      dataIndex: "tickets",
      key: "tickets",
    },
    {
      title: "تعداد علاقه مندی ها",
      dataIndex: "wishlists",
      key: "wishlists",
    },
    {
      title: "تعداد پیام ها",
      dataIndex: "messages",
      key: "messages",
    },
    {
      title: "بن / انبن",
      dataIndex: "ban",
      key: "ban",
      render: (_, record) => (
        <GlobalBtn
          onClick={() => {
            setSelectedUser(record.key);
            setBanUserModal(true);
          }}
          model={1}
          iconName={bannedUsers[record.key] ? "PiXBold" : "PiProhibitBold"}
          title={bannedUsers[record.key] ? "خارج کردن از بن" : "بن کردن"}
          loading={loadingBan === record.key}
        />
      ),
    },
    {
      title: "تغییر سطح",
      dataIndex: "changeRole",
      key: "changeRole",
      render: (_, record) => (
        <>
          {userRoles[record.key] === "ADMIN" ? (
            <GlobalBtn
              title="تغییر به کاربر"
              iconName="PiUserBold"
              model={1}
              loading={loading === record.key}
              onClick={() => changeRole(record.key)}
            />
          ) : (
            <GlobalBtn
              title="تغییر به ادمین"
              iconName="PiUserBold"
              model={1}
              loading={loading === record.key}
              onClick={() => changeRole(record.key)}
            />
          )}
        </>
      ),
    },
  ];

  const data = users.map((user) => ({
    key: user.id,
    image: user.image,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    comments: user.comment.length,
    tickets: user.ticket.length,
    wishlists: user.wishlist.length,
    messages: user.contact.length,
    isBan: user.isBan,
  }));

  return (
    <>
      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data}
        rowClassName={(record) =>
          classNames({
            "opacity-50": bannedUsers[record.key],
          })
        }
      />
      <ShowModal
        open={banUserModal}
        onCancel={() => setBanUserModal(false)}
        status="warning"
        iconName={bannedUsers[selectedUser] ? "PiXBold" : "PiProhibitBold"}
        title={
          bannedUsers[selectedUser]
            ? "آیا از انبن کردن کاربر مطمئن هستید؟"
            : "آیا از بن کردن کاربر مطمئن هستید؟"
        }
        titleBtn={bannedUsers[selectedUser] ? "انبن کردن" : "بن کردن"}
        operation={() => banUserOrUnBan(selectedUser)}
        loading={loadingBan === selectedUser}
      />
    </>
  );
}
