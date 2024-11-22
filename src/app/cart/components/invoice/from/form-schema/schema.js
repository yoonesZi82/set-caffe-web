import { z } from "zod";

const offCodeSchema = z.object({
  code: z
    .string({ message: "کد تخفیف را وارد کنید" })
    .min(1, "کد تخفیف را وارد کنید"),
});

export default offCodeSchema;
