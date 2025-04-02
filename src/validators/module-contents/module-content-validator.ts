import { z } from "zod";

export const moduleContentSchema = z.object({
  sub_module_id: z.string().nonempty(),
  content: z.string().nonempty(),
  name: z.string().nonempty(),
  video_url: z.string().nonempty(),
  file_path: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "File harus berformat PDF",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5MB",
    })
    .nullable()
    .optional(),
});

export type ModuleContentType = z.infer<typeof moduleContentSchema>;
