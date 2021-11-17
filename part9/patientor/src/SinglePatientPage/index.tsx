import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import { PatientPrivateInfoIncluded, Entry } from '../types';
import { useStateValue } from '../state';
import { Icon } from "semantic-ui-react";
import { updatePatient } from '../state';
import HospitalEntry from './HospitalComponent';
import HealthCheckEntry from './HealthCheckComponent';
import OccupationalHealthcareEntry from './OccupationalHealthcareComponent';
import AddEntryForm from './AddEntryForm';

const SinglePatient = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {

      const fetchPatientPrivateInfo = async () => {
        try {
          // https://dmitripavlutin.com/javascript-object-destructuring/#5-aliases
          const { data: patientPrivateInfo } = await axios.get<PatientPrivateInfoIncluded>(
            `${apiBaseUrl}/patients/${id}`
          );

          dispatch(updatePatient(patientPrivateInfo));
        } catch (e) {
          console.error(e);
        }
      };

      try {
        // https://dmitripavlutin.com/check-if-object-has-property-javascript/
        if (!("ssn" in patients[id])) throw new Error ('no ssn property found on patients[id]');
      } catch {
        void fetchPatientPrivateInfo();
      }

    }, []);

    const keys = Object.keys(patients);

    if (keys.length && patients[id].entries) {
      
      const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

      const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
          case "Hospital":
            return <HospitalEntry
              date={entry.date}
              specialist={entry.specialist}
              description={entry.description}
              discharge={entry.discharge}
              diagnosisCodes={entry.diagnosisCodes}
              type={entry.type}
              id={entry.id}
            />;
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry
              date={entry.date}
              specialist={entry.specialist}
              description={entry.description}
              employerName={entry.employerName}
              diagnosisCodes={entry.diagnosisCodes}
              sickLeave={entry.sickLeave}
              type={entry.type}
              id={entry.id}
            />;
          case "HealthCheck":
            return <HealthCheckEntry 
              date={entry.date}
              specialist={entry.specialist}
              description={entry.description}
              healthCheckRating={entry.healthCheckRating}
              diagnosisCodes={entry.diagnosisCodes}
              type={entry.type}
              id={entry.id}
            />;
          default:
            return assertNever(entry);
        }
      };

      // https://semantic-ui.com/kitchen-sink.html
      return (
        <div>
          <h2 className="inline" >{patients[id].name}</h2>
          {patients[id].gender === "male"
            ?  <Icon className="icon" name="mars" size="big"/>
            :  <Icon className="icon" name="venus" size="big"/>
          }
          <ul>
            <li><b>DoB</b>: {patients[id].dateOfBirth}</li>
            <li><b>Occupation</b>: {patients[id].occupation}</li>
            <li><b>SSN</b>: {patients[id].ssn}</li>
            <li><b>ID</b>: {patients[id].id}</li>
          </ul>
          <h3>Entries: </h3>
          {patients[id].entries.map((entry) =>
            <EntryDetails key={entry.id} entry={entry} />
          )}
          <AddEntryForm />
        </div>
      );
    } else return null;
};

export default SinglePatient;