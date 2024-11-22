import { z } from "zod";

const AccountSchema = z.object({
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  email: z.string().email("ایمیل نادرست است"),
  image: z.string().min(1, { message: "عکس را اپلود کنید" }),
});

export default AccountSchema;
