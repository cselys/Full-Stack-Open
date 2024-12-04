import {NewPatientSchema}  from "./util";
import {z} from 'zod';

export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
  
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Discharge = {
    date: string;
    criteria: string;
};

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital';
    discharge:Discharge;
}

export type SickLeave = {
    startDate: string;
    endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

export type PatientInfoPublic = Omit<Patient, 'ssn' | 'entries'>;
// infer the type from schema
export type NewPatientEntry = z.infer<typeof NewPatientSchema>; 