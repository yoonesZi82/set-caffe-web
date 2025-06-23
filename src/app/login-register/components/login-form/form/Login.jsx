"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, notification } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginSchema from "./form-schema/schema";
import EmailInput from "@/components/form/input/EmailInput";
import PasswordInput from "@/components/form/input/PasswordInput";
import CheckboxInput from "@/components/form/input/CheckboxInput";
import ButtonForm from "@/components/form/button-form";
import Form from "@/components/form/panel-form/Form";
import GlobalBtn from "@/components/global-button/GlobalBtn";
import showNotification from "@/utils/notification";

const Login = ({ showRegisterForm, showLoginOtp }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notif, contextHolder] = notification.useNotification();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      reset({
        email: JSON.parse(user).email,
        password: JSON.parse(user).password,
      });
    } else {
      reset();
    }
  }, []);

  const login = (data) => {
    setLoading(true);
    const checkUser = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/auth/signin", checkUser)
      .then((res) => {
        res.status === 200
          ? (showNotification({
              message: "پیغام",
              description: "با موفقیت به حساب خود وارد شدید",
              type: "success",
            }),
            setTimeout(() => router.replace("/p-user"), 3000),
            setError(""))
          : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
      })
      .catch((err) => {
        err.status === 401
          ? setError("فرمت رمز اشتباه است")
          : err.status === 402
          ? setError("فرمت رمز یا ایمیل شما اشتباه است")
          : err.status === 422
          ? setError("کاربری یافت نشد")
          : err.status === 403
          ? setError("رمز  وارد شده اشتباه است")
          : err.status === 423
          ? showNotification({
              message: "پیغام",
              description: "حساب شما بن شده است",
              type: "error",
            })
          : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
      })
      .finally(() => {
        setLoading(false);
        reset();
      });
    if (data.checkbox) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    const user = localStorage.getItem("user");
    if (user) {
      reset({
        email: JSON.parse(user).email,
        password: JSON.parse(user).password,
      });
    } else {
      reset();
    }
  };

  return (
    <>
      {contextHolder}
      <Form title={"فرم ورود"} handleSubmit={handleSubmit(login)}>
        <div className="flex flex-col gap-3" dir="rtl">
          <EmailInput control={control} error={errors?.email?.message} />
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
          <CheckboxInput
            control={control}
            error={errors?.checkbox?.message}
            title={"مرا به خاطر داشته باش"}
          />
        </div>
        <ButtonForm title={"ورود"} loading={loading} />
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mt-2 h-[32px] text-[12px]"
          />
        )}
        <div
          className="flex flex-col justify-center items-center gap-3"
          dir="rtl"
        >
          <div className="flex laptop:flex-row flex-col justify-between items-center gap-[8px] laptop:gap-4 w-full">
            <GlobalBtn
              model={2}
              title={" ورود با کد یکبار مصرف"}
              onClick={showLoginOtp}
            />
            <GlobalBtn
              model={2}
              title={" حساب ندارید"}
              onClick={showRegisterForm}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <Link
              href={"/forget-password"}
              className="text-black text-sm underline"
            >
              رمز عبور را فراموش کرده اید؟
            </Link>
            <Link href={"/"} className="text-black text-sm underline">
              صفحه اصلی
            </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Login;
