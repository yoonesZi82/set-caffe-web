import { z } from "zod";

const DiscountSchema = z.object({
  code: z.string({ message: "کدتخفیف را وارد کنید" }),
  maxUse: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number({ message: "میزان استفاده را وارد کنید" })
  ),
  percent: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number({ message: "درصد تخفیف را وارد کنید" })
  ),
  access: z.number({ message: "دسترسی را وارد کنید" }),
});

export default DiscountSchema;
