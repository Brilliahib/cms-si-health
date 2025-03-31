import { Modules } from "../modules/modules";

export type PreTest = {
  id: string;
  module_id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  module: Modules;
};

export type SubmitPreTest = {
  question_id: string;
  selected_option_id: string;
};

export type HistoryPreTest = {
  id: string;
  sum_score: number;
  created_at: Date;
  pre_test: PreTest;
};
