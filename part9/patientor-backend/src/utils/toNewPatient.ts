import { NewPatient, Gender, NewPatientFields } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) throw new Error('Incorrect or missing name');
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string | undefined => {
    // ssn optional parameter
    if (!ssn) return undefined;
    if (!isString(ssn)) throw new Error('Incorrect format of ssn');
    return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {

    /*
        https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
        Ignore warnings, custom type guard which returns type predicate.
        We know that .includes(param) only returns true if
        it's one of the strings specified in the Gender enum: male, female or other
    */

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) throw new Error('Incorrect or missing gender');
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) throw new Error('Incorrect or missing occupation');
    return occupation;
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: NewPatientFields): NewPatient => {

    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };

    return newPatient;
};

export default toNewPatient;