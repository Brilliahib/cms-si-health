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
