import { z } from "zod";

const TicketSchema = z.object({
  departmentId: z.number({ message: "لطفا دپارتمان را انتخاب کنید" }),
  subDepartmentId: z.number({ message: "لطفا واحد پشتیبان را انتخاب کنید" }),
  piority: z.number({ message: "لطفا اولویت را انتخاب کنید" }),
  title: z.string({ message: "لطفا عنوان خود را وارد کنید" }),
  message: z
    .string({ message: "لطفا پیام خود را وارد کنید" })
    .min(10, "پیام باید حداقل 10 کاراکتر باشد")
    .max(500, "پیام نباید بیشتر از 500 کاراکتر باشد"),
});

export default TicketSchema;
