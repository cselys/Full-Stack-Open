
import patientData from "../../data/patients";
import { Patient, PatientInfoPublic, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';

const getPatient = () : Patient[] => {
    return patientData;
};

const getPatientInfoPublic = () : PatientInfoPublic[] => {
    return patientData.map( ({id, name, dateOfBirth, gender, occupation, entries}) =>({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries,
        }));
};

const getPatientInfoPublicById = (id:string) : PatientInfoPublic | undefined  => {
    return patientData.find(p=> p.id === id);
};

const addPatient = ( entry: NewPatientEntry): Patient => {
    const newPatient ={
        id: uuid(),
        ...entry,
    };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatient,
    getPatientInfoPublic,
    getPatientInfoPublicById,
    addPatient,
};