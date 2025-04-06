export type PersonalInformation = {
  id: string;
  user_id: string;
  name: string;
  place_of_birth: string;
  date_of_birth: Date;
  age: string;
  work: string;
  gender: string;
  is_married: boolean;
  family_status: string;
  patient_type: string;
  disease_duration: string;
  dialisis_duration: string;
};

export type CheckPersonalInformation = {
  is_completed: boolean;
};
