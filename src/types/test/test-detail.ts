import { QuestionBankDetail } from "../question-bank/question-bank";

export type TesDetail = {
  id: string;
  module_id: string;
  question_set_id: string;
  name: string;
  question_set: QuestionBankDetail;
};
