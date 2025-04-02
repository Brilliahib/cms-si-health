export type Modules = {
  id: string;
  name: string;
  description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type SubModules = {
  id: string;
  name: string;
  module_id: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};
