"use client";
import Form from "@/components/form/dashboard-form/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DiscountSchema from "./schema/DiscountSchema";
import NameInput from "@/components/form/input/NameInput";
import NumberInput from "@/components/form/input/NumberInput";
import SelectInput from "@/components/form/input/SelectInput";
import axios from "axios";
import { type } from "os";
import showNotification from "@/utils/notification";

function DiscountForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(DiscountSchema),
  });

  const accessOption = [
    {
      label: "عمومی",
      value: 1,
    },
    {
      label: "خصوصی",
      value: 2,
    },
  ];

  const createDiscount = (data) => {
    setLoading(true);
    axios
      .post("/api/discounts/create", data)
      .then((res) => {
        if (res.status === 201) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "کدتخفیف شما با موفقیت ساخته شد.",
          });
          setError("");
          reset();
        }
      })
      .catch((err) => {
        if (err.status === 402) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "یک کد تخفیف با دسترسی عمومی از قبل وجود دارد.",
          });
          setError("");
        } else if (err.status === 403) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "یک کد تخفیف با این اسم از قبل وجود دارد",
          });
          setError("");
        } else {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "مشکلی سمت سرور وجود آمده است.",
          });
          setError("مشکلی سمت سرور وجود دارد.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form
      error={error}
      loading={loading}
      handleSubmit={handleSubmit(createDiscount)}
    >
      <div className="desktop:w-1/2 laptop:w-1/2 flex flex-col justify-center items-center gap-4 w-full mobile:w-full tablet:w-full">
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.code?.message}
            name={"code"}
            placeholder={"کد تخفیف را بدون درصد وارد کنید*"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NumberInput
            control={control}
            error={errors?.maxUse?.message}
            name={"maxUse"}
            placeholder={"تعداد مجاز استفاده را وارد کنید*"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NumberInput
            control={control}
            error={errors?.percent?.message}
            name={"percent"}
            placeholder={"درصد تخفیف را وارد کنید*"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <SelectInput
            control={control}
            error={errors?.access?.message}
            name={"access"}
            placeholder={"دسترسی را انتخاب کنید*"}
            newOption={accessOption}
          />
        </div>
      </div>
    </Form>
  );
}

export default DiscountForm;
