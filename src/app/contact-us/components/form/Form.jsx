"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CallSchema from "./form-schema/schema";
import PhoneInput from "@/components/form/input/PhoneInput";
import NameInput from "@/components/form/input/NameInput";
import EmailInput from "@/components/form/input/EmailInput";
import MessageInput from "@/components/form/input/message-input";
import CompanyInput from "@/components/form/input/CompanyInput";
import CheckboxInput from "@/components/form/input/CheckboxInput";
import axios from "axios";
import Form from "@/components/form/client-form/Form";
import showNotification from "@/utils/notification";

const FormContact = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CallSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      checkbox: false,
    },
  });

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      reset({
        name: JSON.parse(items).name,
        email: JSON.parse(items).email,
        phone: JSON.parse(items).phone,
      });
    } else {
      reset();
    }
  }, []);

  const sendForm = (data) => {
    setLoading(true);
    if (user) {
      const newMessage = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,
        userID: user.id,
      };
      axios
        .post("/api/contact/create", newMessage)
        .then((res) => {
          if (res.status === 201) {
            showNotification({
              message: "پیغام",
              description: "پیغام شما با موفقیت ارسال شد.",
              type: "success",
            });
            setError("");
          }
        })
        .catch((err) => setError("در ارسال پیام مشکلی به وجود امد"))
        .finally(() => setLoading(false));
      if (data.checkbox) {
        localStorage.setItem("items", JSON.stringify(data));
      }
      const items = localStorage.getItem("items");
      if (items) {
        reset({
          message: "",
          company: "",
          name: JSON.parse(items).name,
          email: JSON.parse(items).email,
          phone: JSON.parse(items).phone,
        });
      } else {
        reset();
      }
    } else {
      showNotification({
        message: "پیغام",
        description: "برای ارسال پیام باید وارد حساب خود شوید",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        title={"فرم تماس"}
        description={"برای تماس با ما فرم را کامل کنید"}
        error={error}
        loading={loading}
        handleSubmit={handleSubmit(sendForm)}
      >
        <div className="gap-3 grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-grid-cols-2">
          <div className="flex flex-col gap-3">
            <NameInput control={control} error={errors?.name?.message} />
          </div>
          <div className="flex flex-col gap-3">
            <PhoneInput control={control} error={errors?.phone?.message} />
          </div>
          <div className="flex flex-col gap-3">
            <EmailInput control={control} error={errors?.email?.message} />
          </div>
          <div className="flex flex-col gap-3">
            <CompanyInput control={control} error={errors?.company?.message} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <MessageInput control={control} error={errors?.message?.message} />
        </div>
        <div>
          <CheckboxInput
            control={control}
            error={errors?.checkbox?.message}
            title={"ذخیره اطلاعات برایه پیغام بعدی"}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormContact;
