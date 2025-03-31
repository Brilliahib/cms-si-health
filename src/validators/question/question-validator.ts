import { z } from "zod";

const optionSchema = z.object({
  option_text: z.string().nonempty(),
  score: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  }, z.number().nullable()),
});

const multipleChoiceQuestionSchema = z.object({
  question_set_id: z.string().uuid(),
  type: z.literal("multiple_choice"),
  question_text: z.string().nonempty(),
  options: z
    .array(optionSchema)
    .min(2, { message: "Minimal harus ada 2 opsi" }),
});

const essayQuestionSchema = z.object({
  question_set_id: z.string().uuid(),
  type: z.literal("essay"),
  question_text: z.string().nonempty(),
});

export const questionSchema = z.union([
  multipleChoiceQuestionSchema,
  essayQuestionSchema,
]);

export type QuestionType = z.infer<typeof questionSchema>;
