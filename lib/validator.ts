import * as z from "zod"

export const eventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters."),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters."),
    imageUrl: z.string(),
    startDateTime: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
  })
  .refine((data) => data.startDateTime < data.endDateTime, {
    message: "End date cannot be earlier than start date.",
    path: ["endDateTime"],
  })
