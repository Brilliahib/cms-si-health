import { z } from "zod";

const optionSchema = z.object({
  option_text: z.string().nonempty(),
  is_correct: z.boolean(),
});

const multipleChoiceQuestionSchema = z.object({
  question_set_id: z.string().uuid(),
  type: z.literal("multiple_choice"),
  question_text: z.string().nonempty(),
  answer_key: z.string().nonempty(),
  options: z
    .array(optionSchema)
    .min(2, { message: "Minimal harus ada 2 opsi" })
    .refine((opts) => opts.some((o) => o.is_correct), {
      message: "Harus ada minimal 1 jawaban benar",
    }),
});

const essayQuestionSchema = z.object({
  question_set_id: z.string().uuid(),
  type: z.literal("essay"),
  question_text: z.string().nonempty(),
  answer_key: z.string().nonempty(),
});

export const questionSchema = z.union([
  multipleChoiceQuestionSchema,
  essayQuestionSchema,
]);

export type QuestionType = z.infer<typeof questionSchema>;
