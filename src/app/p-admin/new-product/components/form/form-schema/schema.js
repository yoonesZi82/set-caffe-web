import { z } from "zod";

const NewProductSchema = z.object({
  name: z
    .string({ message: "نام را وارد کنید" })
    .min(1, { message: "نام را وارد کنید" }),
  price: z.string({ message: "قیمت را وارد کنید" }),
  shortDescription: z
    .string({ message: "توضیحات کوتاه را وارد کنید" })
    .min(1, { message: "توضیحات کوتاه را وارد کنید" }),
  longDescription: z
    .string({ message: "توضیحات بلند را وارد کنید" })
    .min(1, { message: "توضیحات بلند را وارد کنید" }),
  weight: z.string({ message: "وزن را وارد کنید" }),
  suitableFor: z.string({ message: "برایه چه افرادی مناسب است" }),
  smell: z.string({ message: "میزان بو را وارد کنید" }),
  image: z
    .string({ message: "عکس را اپلود کنید" })
    .min(1, { message: "عکس را اپلود کنید" }),
  tags: z.string({ message: "برچسب را وارد کنید" }),
  number: z.string({ message: "تعداد را وارد کنید" }),
});

export default NewProductSchema;
