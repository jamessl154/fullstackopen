import patientData from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getEntries = (): Array<NonSensitivePatient> => {
  /*
    TypeScript only checks whether we have all of the required fields or not,
    but excess fields are not prohibited. function getEntries maps the patientData type Patient[]
    to return type NonSensitivePatient[] but must manually remove field ssn
  */
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};