import patientData from '../../data/patients';
import uuid = require('uuid');
import { PublicPatient, NewPatient, Patient } from '../types';

const getPatients = (): Array<PublicPatient> => {
  /*
    TypeScript only checks whether we have all of the required fields or not,
    but excess fields are not prohibited. function getPatients maps the patientData type Patient[]
    to return type PublicPatient[] but must manually remove fields ssn and entries
  */
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const getPatientPrivateInfo = (id: string): Patient | undefined => {
  const patient = patientData.find((patient) => patient.id === id);
  if (patient) {
    patient.entries = [];
    return patient;
  } else {
    return undefined;
  }
};

const addPatient = (patient: NewPatient): Patient => {

  // https://stackoverflow.com/a/43837860
  const id: string = uuid.v4();

  const newPatient = {
    ...patient,
    id
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
  getPatientPrivateInfo
};