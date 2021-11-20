import { NewEntryFields, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";

const parseDescription = (description: unknown) => {
    if (!description) throw new Error("Missing description on entry");
    return description;
};

const parseDate = (date: unknown) => {
    if (!date) throw new Error("Missing date on entry");
    return date;
};

const parseSpecialist = (specialist: unknown) => {
    if (!specialist) throw new Error("Missing specialist on entry");
    return specialist;
};

const parseHealthCheckRating = (rating: unknown) => {
    // 0 is falsy so must deal with this first
    if (rating === 0) return rating;
    if (!rating) throw new Error("Missing rating on entry");
    return rating;
};
const parseDischarge = (discharge: unknown) => {
    if (!discharge) throw new Error("Missing discharge on entry");
    return discharge;
};

const parseEmployerName = (employerName: unknown) => {
    if (!employerName) throw new Error("Missing employer name on entry");
    return employerName;
};

// Not complete validation, we're assuming the fields have correct types
// based solely on whether the required fields for a corresponding type exist
// e.g. HealthCheckEntry type: if all non-optional properties of the BaseEntry
// + healthCheckRating properties exist (not undefined) => we continue execution
// by asserting types as valid
const toNewEntry = (object: NewEntryFields): Entry => {

    // checking required fields for HealthCheckEntry are given
    switch (object.type) {
        case "HealthCheck":
            const Health = {
                type: "HealthCheck",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
                diagnosisCodes: object.diagnosisCodes
            };
            // and once passed the checks, asserting that the object is HealthCheckEntryType
            return Health as HealthCheckEntry;
        case "OccupationalHealthcare":
            const Occupational = {
                type: "OccupationalHealthcare",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                employerName: parseEmployerName(object.employerName),
                sickLeave: object.sickLeave,
                diagnosisCodes: object.diagnosisCodes
            };
            return Occupational as OccupationalHealthcareEntry;
        case "Hospital":
            const Hospital = {
                type: "Hospital",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                discharge: parseDischarge(object.discharge),
                diagnosisCodes: object.diagnosisCodes
            };
            return Hospital as HospitalEntry;
        default:
            // If execution reaches here, the object.type property does not exist
            // or is not one of the 3 typed entries
            throw new Error("Missing or incorrect type on entry");
    }
};

export default toNewEntry;