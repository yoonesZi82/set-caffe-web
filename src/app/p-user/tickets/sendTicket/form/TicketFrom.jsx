"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import TicketSchema from "./form-schema/schema";
import Form from "@/components/form/dashboard-form/Form";
import MessageInput from "@/components/form/input/message-input";
import DepartmentSelect from "@/components/form/input/DepartmentInput";
import SubDepartmentSelect from "@/components/form/input/SubInput";
import SelectInput from "@/components/form/input/SelectInput";
import NameInput from "@/components/form/input/NameInput";
import axios from "axios";
import showNotification from "@/utils/notification";

function TicketForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TicketSchema),
  });

  const departmentId = watch("departmentId");

  const sendTicket = (data) => {
    setLoading(true);
    const newTicket = {
      title: data.title,
      body: data.message,
      piority: data.piority,
      userID: user.id,
      subdepartmentID: data.subDepartmentId,
      departmentID: data.departmentId,
    };
    axios
      .post("/api/tickets/create", newTicket)
      .then((res) => {
        if (res.status === 201) {
          showNotification({
            type: "success",
            message: "پیغام",
            description: "تیکت شما با موفقیت ارسال شد",
          });
          reset();
        }
      })
      .catch((err) => setError("مشکلی در ارتباط با سرور به وجود امده است"))
      .finally(() => setLoading(false));
  };

  return (
    <Form handleSubmit={handleSubmit(sendTicket)} loading={loading}>
      <div className="desktop:w-1/2 laptop:w-1/2 flex flex-col justify-center items-center gap-4 w-full mobile:w-full tablet:w-full">
        <div className="flex flex-col gap-3 w-full">
          <NameInput
            control={control}
            error={errors?.name?.message}
            name="title"
            placeholder="موضوع*"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <DepartmentSelect
                {...field}
                error={errors.departmentId?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Controller
            name="subDepartmentId"
            control={control}
            render={({ field }) => (
              <SubDepartmentSelect
                {...field}
                error={errors.subDepartmentId?.message}
                departmentId={departmentId}
                onChange={field.onChange} // اضافه کردن onChange
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Controller
            name="piority"
            control={control}
            render={({ field }) => (
              <SelectInput
                {...field}
                error={errors.piority?.message}
                departmentId={departmentId}
                onChange={field.onChange} // اضافه کردن onChange
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <MessageInput control={control} error={errors?.message?.message} />
        </div>
      </div>
    </Form>
  );
}

export default TicketForm;
