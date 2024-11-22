import { z } from "zod";

const RegisterSchema = z.object({
  phone: z
    .string({ message: "شماره تلفن خود را وارد کنید" })
    .min(11, { message: "شماره تلفن حداقل باید 11 کاراکتر باشد" })
    .max(11, { message: "شماره تلفن حداکثر باید 11 کاراکتر باشد" })
    .regex(/^(\+98|0)?9\d{9}$/g, "فرمت شماره نادرست است"),
  code: z.string(),
});

export default RegisterSchema;
