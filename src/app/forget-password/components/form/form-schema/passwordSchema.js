import { z } from "zod";

const ForgetPassSchema = z.object({
  password: z
    .string({ message: "رمز عبور را وارد کنید" })
    .min(8, { message: "رمز عبور باید 8 کاراکتر یا بیشتر باشد" })
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
      "رمز عبور باید ترکیبی از حروف کوچک و بزرگ و اعداد و کاراکتر خاص باشد"
    ),
  confirmPassword: z
    .string({ message: "تکرار رمز عبور را وارد کنید" })
    .min(8, { message: "رمز عبور باید 8 کاراکتر یا بیشتر باشد" })
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
      "رمز عبور باید ترکیبی از حروف کوچک و بزرگ و اعداد و کاراکتر خاص باشد"
    ),
});

export default ForgetPassSchema;
