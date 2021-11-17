export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    ssn?: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries?: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NewPatientFields = { 
    name: unknown,
    dateOfBirth: unknown,
    ssn?: unknown,
    gender: unknown,
    occupation: unknown
};

interface NewEntryFieldsBase {
    id: unknown;
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
}

interface NewEntryFieldsHealthCheck extends NewEntryFieldsBase {
    type: "HealthCheck";
    healthCheckRating: unknown;
}

interface NewEntryFieldsOccupational extends NewEntryFieldsBase {
    type: "OccupationalHealthcare";
    employerName: unknown;
    sickLeave?: unknown;
}

interface NewEntryFieldsHospital extends NewEntryFieldsBase {
    type: "Hospital";
    discharge: unknown;
}

export type NewEntryFields = NewEntryFieldsHospital | NewEntryFieldsOccupational | NewEntryFieldsHealthCheck;

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;