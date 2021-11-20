import patientData from '../../data/patients';
import uuid = require('uuid');
import { PublicPatient, NewPatient, Patient, Entry } from '../types';

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
  if (patient) return patient;
  else return undefined;
};

const addPatient = (patient: NewPatient): Patient => {

  // https://stackoverflow.com/a/43837860
  const id: string = uuid.v4();

  const newPatient = {
    ...patient,
    id,
    entries: []
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patientID: string, entry: Entry): Patient => {

  // find the patient we are trying to add the entry to using patientID
  const patient = patientData.find((x) => x.id === patientID);

  if (!patient) throw new Error("No Patient found with that ID");

  // create entries array for patients lacking one
  if (!patient.entries) patient.entries = [];
  
  const entryID: string = uuid.v4();

  const newEntry = {
    ...entry,
    id: entryID
  };

  // push the new entry to the array
  patient.entries.push(newEntry);

  // add new patientData to the server
  patientData.map((x) => x.id === patient.id ? patient : x );

  // return patient with added entry
  return patient;
};

export default {
  getPatients,
  addPatient,
  getPatientPrivateInfo,
  addEntry
};