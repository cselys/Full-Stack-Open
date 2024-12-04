import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
import {  NewPatientEntry, Patient, PatientInfoPublic } from '../types';
import {NewPatientSchema} from '../util';
import {z} from 'zod';

const router = express.Router();

router.get ('/', (_req, res : Response<PatientInfoPublic[]>) => {
    res.send (patientService.getPatientInfoPublic());
});

router.get ('/:id', (req, res : Response<PatientInfoPublic>) => {
  const id: string = req.params.id;
  const patient : PatientInfoPublic | undefined= patientService.getPatientInfoPublicById(id);
  if(patient)
    res.status(200).send (patient);
  else
    res.status(404);
  });

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
        NewPatientSchema.parse(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, 
    NewPatientEntry>, res: Response<Patient>) => {
        const newEntry = patientService.addPatient(req.body);
        res.json(newEntry);
});      

router.use(errorMiddleware);

export default router;
