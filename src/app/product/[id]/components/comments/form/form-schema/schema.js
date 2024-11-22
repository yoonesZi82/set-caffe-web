import { z } from "zod";

const CommentSchema = z.object({
  message: z
    .string()
    .min(1, { message: "متن پیام را وارد کنید" })
    .max(300, { message: "متن پیام نمیتواند بیشتر از 300 کاراکتر باشد" }),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  email: z.string().email("ایمیل نادرست است"),
  score: z
    .number({ message: "امتیاز خود را وارد کنید" })
    .min(0.5, "امتیاز را وارد کنید")
    .max(5),
});

export default CommentSchema;
