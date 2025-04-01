import { Question } from "../questions/question";

export type Screening = {
  id: string;
  question_set_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type ScreeningDetail = {
  id: string;
  name: string;
  questions: Question[];
};

export type SubmitScreening = {
  question_id: string;
  selected_option_id: string;
};

export type HistoryScreening = {
  id: string;
  created_at: Date;
  screening: Screening;
};
