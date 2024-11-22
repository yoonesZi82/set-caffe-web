"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, notification } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/form/panel-form/Form";
import axios from "axios";
import RegisterSchema from "./form-schema/schema";
import NameInput from "@/components/form/input/NameInput";
import EmailInput from "@/components/form/input/EmailInput";
import PhoneInput from "@/components/form/input/PhoneInput";
import PasswordInput from "@/components/form/input/PasswordInput";
import ButtonForm from "@/components/form/button-form";

const Register = ({ showLoginForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notif, contextHolder] = notification.useNotification();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = (data) => {
    setLoading(true);
    if (data.password != data.confirmPassword) {
      setError("رمز و تکرار رمز شما با هم یکی نیست");
      setLoading(false);
      return false;
    }
    const newUser = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    if (newUser) {
      axios
        .post("/api/auth/signup", newUser)
        .then((res) => {
          res.status === 201
            ? (notif.open({
                message: "پیغام",
                description: "حساب شما با موفقیت ساخته شد",
                type: "success",
                placement: "topLeft",
                showProgress: true,
                pauseOnHover: true,
              }),
              setTimeout(() => showLoginForm(), 3000),
              setError(""))
            : setError("در ساخت حساب شما مشکلی به وجود امد");
        })
        .catch((err) => {
          err.status === 422
            ? setError("با این ایمیل یا شماره موبایل قبلا ثبت نام شده است")
            : setError("در ساخت حساب شما مشکلی به وجود امد");
        })
        .finally(() => {
          setLoading(false);
          reset();
        });
    }
  };

  return (
    <>
      {contextHolder}
      <Form title={"فرم ثبت نام"} handleSubmit={handleSubmit(register)}>
        <div className="flex flex-col gap-3" dir="rtl">
          <NameInput control={control} error={errors?.name?.message} />
        </div>
        <div className="flex flex-col gap-3" dir="rtl">
          <EmailInput control={control} error={errors?.email?.message} />
        </div>
        <div className="flex flex-col gap-3" dir="rtl">
          <PhoneInput control={control} error={errors?.phone?.message} />
        </div>
        <div className="flex flex-col gap-3" dir="rtl">
          <PasswordInput
            control={control}
            error={errors?.password?.message}
            name={"password"}
            placeholder={"رمزعبور*"}
          />
        </div>
        <div className="flex flex-col gap-3" dir="rtl">
          <PasswordInput
            control={control}
            error={errors?.confirmPassword?.message}
            name={"confirmPassword"}
            placeholder={"تکرار رمزعبور*"}
          />
        </div>
        <ButtonForm title={"ثبت نام"} loading={loading} />
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mt-2 h-[32px] text-[12px]"
          />
        )}
        <div className="flex justify-center items-center mt-3">
          <Button
            className="bg-transparent border-none text-black underline"
            onClick={showLoginForm}
          >
            برگشت
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Register;
