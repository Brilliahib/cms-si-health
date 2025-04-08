import { z } from "zod";

export const discussionSchema = z.object({
  title: z.string(),
});

export type DiscussionType = z.infer<typeof discussionSchema>;
