import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnosis = () : Diagnosis[] => {
    return diagnosisData;
};

const addDiagnosis = () =>{
    return null;
};

export default {
    getDiagnosis,
    addDiagnosis
};
