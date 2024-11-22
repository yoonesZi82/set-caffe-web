"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { notification } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CommentSchema from "./form-schema/schema";
import Form from "@/components/form/client-form/Form";
import NameInput from "@/components/form/input/NameInput";
import EmailInput from "@/components/form/input/EmailInput";
import MessageInput from "@/components/form/input/message-input";
import ScoreStar from "@/components/form/input/ScoreStar";
import axios from "axios";
import showNotification from "@/utils/notification";

function FormClient({ id, user }) {
  const [notif, contextHolder] = notification.useNotification();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      score: 0,
    },
  });

  const sendComment = (data) => {
    setLoading(true);
    if (user) {
      const newComment = {
        username: data.name,
        email: data.email,
        body: data.message,
        score: data.score,
        userID: user.id,
        productID: id,
      };
      axios
        .post("/api/comments/create", newComment)
        .then((res) => {
          if (res.status === 201) {
            showNotification({
              message: "پیغام",
              description: "پیغام شما با موفقیت ارسال شد.",
              type: "success",
            });
            reset();
          }
        })
        .catch((err) => setError("در ارسال نظر مشکلی به وجود امد"))
        .finally(() => setLoading(false));
    } else {
      showNotification({
        message: "پیغام",
        description: "برای ثبت نظر باید وارد حساب کاربری خود شوید",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Form
      title={"فرم کامنت"}
      handleSubmit={handleSubmit(sendComment)}
      description={"لطفا نظر خود را درباره محصول بنویسید"}
      error={error}
      loading={loading}
    >
      <div className="gap-3 grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-grid-cols-2">
        <div className="flex flex-col gap-3">
          <NameInput control={control} error={errors?.name?.message} />
        </div>
        <div className="flex flex-col gap-3">
          <EmailInput control={control} error={errors?.name?.message} />
        </div>
      </div>
      <MessageInput control={control} error={errors?.message?.message} />
      <ScoreStar control={control} error={errors?.score?.message} />
    </Form>
  );
}

export default FormClient;
