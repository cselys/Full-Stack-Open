import { NewPatientEntry, Gender } from "./types";
import {z} from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(), 
    dateOfBirth: z.string().date(), 
    ssn: z.string(), 
    gender:z.nativeEnum(Gender),
    occupation: z.string(),
    entries:z.string().array(),
});

export const toNewPatient = (obj: unknown): NewPatientEntry => {
    return NewPatientSchema.parse(obj);
};