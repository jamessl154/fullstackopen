import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};