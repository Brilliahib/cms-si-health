import { z } from "zod";

export const discussionMessageSchema = z.object({
  discussion_id: z.string().nonempty(),
  medical_id: z.string().nullable().optional(),
  comment: z.string().nonempty(),
  is_private: z.boolean().default(false),
  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      {
        message: "File harus berupa gambar (JPG, JPEG, atau PNG)",
      },
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    })
    .nullable()
    .optional(),
});

export type DiscussionMessageType = z.infer<typeof discussionMessageSchema>;
