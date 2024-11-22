"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, notification, Statistic } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Form from "@/components/form/panel-form/Form";
import axios from "axios";
import RegisterSchema from "./form-schema/schema";
import ButtonForm from "@/components/form/button-form";
import PhoneInput from "@/components/form/input/PhoneInput";
import OtpInput from "@/components/form/input/OtpInput";
import showNotification from "@/utils/notification";
const { Countdown } = Statistic;

const Sms = ({ showLoginForm }) => {
  const router = useRouter();
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
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      phone: "",
      code: "",
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
            ? (showNotification({
                message: "پیغام",
                description: "کد با موفقیت ارسال شد",
                type: "success",
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
            ? (showNotification({
                message: "پیغام",
                description: "با موفقیت به حساب خود وارد شدید",
                type: "success",
              }),
              setError(""),
              router.replace("/p-user"))
            : setError("در پیدا کردن حساب شما مشکلی به وجود امد");
        })
        .catch((err) => {
          err.status === 401
            ? setError("کد وارد شده منقضی شده است")
            : err.status === 402
            ? setError("کد وارد شده معتبر نیست")
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

  return (
    <>
      {contextHolder}
      <Form
        title={"ورود با شماره تلفن"}
        handleSubmit={!otp ? handleSubmit(sendCode) : handleSubmit(verifyCode)}
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
            onClick={showLoginForm}
          >
            برگشت
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Sms;
