import { Modules } from "../modules/modules";

export type PostTest = {
  id: string;
  module_id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  module: Modules;
};

export type HistoryPostTest = {
  id: string;
  sum_score: number;
  created_at: Date;
  post_test: PostTest;
};
