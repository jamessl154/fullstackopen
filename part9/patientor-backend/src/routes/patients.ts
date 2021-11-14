import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import { Fields } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  try {
    // type assert that the request body is type Fields
    // because in this try catch block and we are manually throwing errors
    // when checking properties that all have type unknown.
    // E.g. req.body is empty {}, parseName(name) checks req.body.name
    // property is truthy, but is undefined here which throws error
    // which is caught before execution proceeds
    const newPatient = toNewPatient(req.body as Fields);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;