"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AccountSchema from "./form-schema/schema";
import Form from "@/components/form/dashboard-form/Form";
import NameInput from "@/components/form/input/NameInput";
import EmailInput from "@/components/form/input/EmailInput";
import UploadInput from "@/components/form/input/UploadInput";
import axios from "axios";
import showNotification from "@/utils/notification";

function DetailForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(AccountSchema),
  });

  const updateAccount = (data) => {
    setLoading(true);
    axios
      .put("/api/user/update", { ...data, userID: user.id })
      .then((res) => {
        if (res.status === 200) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "تغیرات شما با موفقیت ثبت شد",
          });
          location.reload();
        }
      })
      .catch((err) => {
        if (err) {
          setError("مشکلی در ارتباط با سرور به وجود امده است");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      handleSubmit={handleSubmit(updateAccount)}
      loading={loading}
      error={error}
    >
      <div className="gap-4 grid grid-cols-1 laptop:grid-cols-2 w-full">
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.name?.message}
            defaultValue={user ? user.name : ""}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <EmailInput
            control={control}
            error={errors?.email?.message}
            defaultValue={user ? user.email : ""}
          />
        </div>
        <div className="flex flex-col gap-3 col-span-1 laptop:col-span-2 w-full">
          <UploadInput
            control={control}
            error={errors?.image?.message}
            setValue={setValue}
            defaultValue={user.image ? user.image : null}
            userID={user ? user.id : null}
            route={"account"}
          />
        </div>
      </div>
    </Form>
  );
}

export default DetailForm;
