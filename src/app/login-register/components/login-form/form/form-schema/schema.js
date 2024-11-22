import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({ message: "ایمیل را وارد کنید" })
    .email("ایمیل وارد شده معتبر نیسیت"),
  password: z
    .string({ message: "رمز عبور را وارد کنید" })
    .min(8, { message: "رمز عبور باید 8 کاراکتر یا بیشتر باشد" })
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
      "رمز عبور باید ترکیبی از حروف کوچک و بزرگ و اعداد و کاراکتر خاص باشد"
    ),
  checkbox: z.boolean(),
});

export default LoginSchema;
