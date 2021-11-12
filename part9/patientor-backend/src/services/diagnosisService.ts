import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnosesData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};