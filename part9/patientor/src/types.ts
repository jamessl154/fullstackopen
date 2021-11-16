export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
}

export interface PatientPrivateInfoOptional {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  entries?: Entry[];
  dateOfBirth?: string;
}

export interface PatientPrivateInfoIncluded extends PatientPrivateInfoOptional {
  ssn: string;
  entries: Entry[];
}

export type Patient = PatientPrivateInfoOptional | PatientPrivateInfoIncluded;