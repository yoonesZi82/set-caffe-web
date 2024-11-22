"use client";
import Form from "@/components/form/dashboard-form/Form";
import NameInput from "@/components/form/input/NameInput";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NewProductSchema from "./form-schema/schema";
import MessageInput from "@/components/form/input/message-input";
import SelectInput from "@/components/form/input/SelectInput";
import UploadInput from "@/components/form/input/UploadInput";
import axios from "axios";
import showNotification from "@/utils/notification";

function NewProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(NewProductSchema),
  });

  const addProduct = (data) => {
    setLoading(true);
    const newProduct = {
      ...data,
      price: Number(data.price),
      img: data.image,
      number: Number(data.number),
      weight: Number(data.weight),
      score: 5,
    };

    axios
      .post("/api/products/create", newProduct)
      .then((res) => {
        if (res.status === 201) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "محصول شما با موفقیت اضافه شد",
          });
          reset();
          setError("");
          setValue("suitableFor", null);
          setValue("smell", null);
          setValue("image", null);
        }
      })
      .catch((err) => {
        if (err.status === 411) {
          showNotification({
            type: "error",
            message: "پیغام",
            description: "محصولی با این نام وجود دارد",
          });
        } else {
          setError("مشکلی سمت سرور به وجود امده است");
        }
      })
      .finally(() => setLoading(false));
  };

  const subtitleForOptions = [
    { value: "بزرگسالان", label: "بزرگسالان" },
    { value: "عموم", label: "عموم" },
    { value: "کودکان", label: "کودکان" },
    { value: "کودکان و بزرگسالان", label: "کودکان و بزرگسالان" },
    { value: "بیمارن استثنایی", label: "بیمارن استثنایی" },
  ];
  const smellOptions = [
    { value: "ترش", label: "ترش" },
    { value: "ملایم", label: "ملایم" },
    { value: "تلخ", label: "تلخ" },
  ];
  return (
    <Form
      handleSubmit={handleSubmit(addProduct)}
      loading={loading}
      error={error}
    >
      <div className="desktop:w-1/2 laptop:w-1/2 flex flex-col justify-start items-center gap-4 pt-[25px] pl-[10px] w-full mobile:w-full tablet:w-full h-full min-h-[500px] overflow-y-auto">
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.name?.message}
            name={"name"}
            placeholder={"نام محصول"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.price?.message}
            name={"price"}
            placeholder={"قیمت محصول"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.shortDescription?.message}
            name={"shortDescription"}
            placeholder={"توضیحات کوتاه محصول"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <MessageInput
            control={control}
            error={errors?.longDescription?.message}
            name={"longDescription"}
            placeholder={"توضیحات محصول"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.weight?.message}
            name={"weight"}
            placeholder={"وزن محصول"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <SelectInput
            control={control}
            error={errors?.suitableFor?.message}
            name={"suitableFor"}
            placeholder={"برایه چه افرادی مناسب است"}
            newOption={subtitleForOptions}
            onChange={(value) => setValue("suitableFor", value)}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <SelectInput
            control={control}
            error={errors?.smell?.message}
            name={"smell"}
            placeholder={"میزان بو محصول"}
            newOption={smellOptions}
            onChange={(value) => setValue("smell", value)}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <UploadInput
            control={control}
            error={errors?.image?.message}
            setValue={setValue}
            route={"product"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.tags?.message}
            name={"tags"}
            placeholder={"برچسب‌ها را با (,) وارد کنید"}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.number?.message}
            name={"number"}
            placeholder={"تعداد محصول"}
          />
        </div>
      </div>
    </Form>
  );
}

export default NewProductForm;
