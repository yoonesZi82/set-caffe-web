"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, notification, Statistic } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "@/components/form/input/PhoneInput";
import ButtonForm from "@/components/form/button-form";
import Form from "@/components/form/panel-form/Form";
import VerifySchema from "./form-schema/verifySchema";
import ForgetPassSchema from "./form-schema/passwordSchema";
import OtpInput from "@/components/form/input/OtpInput";
import PasswordInput from "@/components/form/input/PasswordInput";
const { Countdown } = Statistic;

const ForgetForm = () => {
  const router = useRouter();
  const [form, setForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [notif, contextHolder] = notification.useNotification();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(!form ? VerifySchema : ForgetPassSchema),
    defaultValues: !form
      ? { phone: "", code: "" }
      : {
          password: "",
          confirmPassword: "",
        },
  });

  const sendCode = (data) => {
    setLoading(true);
    if (data) {
      const newPhone = {
        phone: data.phone,
      };
      axios
        .post("/api/auth/sms/send", newPhone)
        .then((res) => {
          res.status === 201
            ? (notif.open({
                message: "پیغام",
                description: "کد با موفقیت ارسال شد",
                type: "success",
                placement: "topLeft",
                showProgress: true,
                pauseOnHover: true,
              }),
              setOtp(true),
              setTime(Date.now() + 1000 * 60 * 3),
              setError(""))
            : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
        })
        .catch((err) => {
          err.status === 422
            ? setError("کاربری یافت نشد")
            : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const verifyCode = (data) => {
    if (data.code.length !== 6) {
      setError("کد وارد شده معتبر نیست");
      return false;
    }
    const verify = {
      phone: data.phone,
      code: data.code,
    };
    if (verify) {
      axios
        .post("/api/auth/sms/verify", verify)
        .then((res) => {
          res.status === 200
            ? (notif.open({
                message: "پیغام",
                description: "حساب شما یافت شد",
                type: "success",
                placement: "topLeft",
                showProgress: true,
                pauseOnHover: true,
              }),
              setError(""),
              setOtp(false),
              setForm(true),
              setPhone(verify.phone))
            : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
        })
        .catch((err) => {
          err.status === 401
            ? setError("کد وارد شده منقضی شده است")
            : err.status === 402
            ? setError("کد وارد شده معتبر نیست")
            : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onFinish = () => {
    setOtp(false);
    reset({
      phone: "",
      code: "",
    });
    setError("");
  };

  const changePassword = (data) => {
    setLoading(true);
    const newPassword = {
      phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    if (newPassword) {
      axios
        .post("/api/auth/forget-password", newPassword)
        .then((res) => {
          res.status === 200
            ? (notif.open({
                message: "پیغام",
                description: "رمز عبور شما با موفقیت تغییر کرد",
                type: "success",
                placement: "topLeft",
                showProgress: true,
                pauseOnHover: true,
              }),
              setError(""),
              setTimeout(() => router.replace("/login-register"), 3000))
            : setError("در تغییر رمز عبور مشکلی به وجود امد");
        })
        .catch((err) => {
          err.status === 400
            ? setError("شماره همراه معتبر نیست")
            : err.status === 401
            ? setError("رمز و تکرار رمز برابر نیست")
            : err.status === 402
            ? setError("کاربر یافت نشد")
            : setError("در تغییر رمز عبور مشکلی به وجود امد");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      {contextHolder}
      {!form ? (
        <Form
          title={"ورود با شماره تلفن"}
          handleSubmit={
            !otp ? handleSubmit(sendCode) : handleSubmit(verifyCode)
          }
        >
          <div className="flex flex-col gap-3" dir="rtl">
            <PhoneInput control={control} error={errors?.phone?.message} />
          </div>
          {otp && (
            <div className="flex flex-col gap-3" dir="rtl">
              <OtpInput control={control} error={errors?.code?.message} />
            </div>
          )}
          {!otp ? (
            <>
              <ButtonForm title={"ارسال کد"} loading={loading} />
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="mt-2 h-[32px] text-[12px]"
                />
              )}
            </>
          ) : (
            <>
              {otp ? (
                <div className="flex justify-center items-center w-full">
                  <Countdown
                    title="تا منقضی شدن کد "
                    value={time}
                    onFinish={onFinish}
                    format="mm:ss"
                  />
                </div>
              ) : null}
              <ButtonForm title={"ورود"} loading={loading} />
              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  className="mt-2 h-[32px] text-[12px]"
                />
              )}
            </>
          )}
          <div className="flex justify-center items-center mt-3">
            <Button
              className="bg-transparent border-none text-black underline"
              onClick={() => router.replace("/login-register")}
            >
              برگشت
            </Button>
          </div>
        </Form>
      ) : (
        <Form title={"تغییر رمز"} handleSubmit={handleSubmit(changePassword)}>
          <div className="flex flex-col gap-3" dir="rtl">
            <PasswordInput
              control={control}
              error={errors?.password?.message}
              name={"password"}
              placeholder={"رمز عبور"}
            />
          </div>
          <div className="flex flex-col gap-3" dir="rtl">
            <PasswordInput
              control={control}
              error={errors?.confirmPassword?.message}
              name={"confirmPassword"}
              placeholder={"تکرار رمز عبور"}
            />
          </div>

          <ButtonForm title={"تغییر رمز"} loading={loading} />
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
              onClick={() => router.replace("/login-register")}
            >
              برگشت
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default ForgetForm;
