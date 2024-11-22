import { z } from "zod";

const AnswerSchema = z.object({
  answer: z
    .string({ message: "پاسخ را وارد کنید" })
    .min(1, { message: "پاسخ را وارد کنید" }),
});

export default AnswerSchema;
