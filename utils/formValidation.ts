import { z } from "zod";

export const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  content: z.string().nonempty("Content is required"),
  avatar: z
    .any()
    .refine((files) => files?.length === 1, "Avatar is required")
    .optional(),
});

export type FormSchema = z.infer<typeof formSchema>;