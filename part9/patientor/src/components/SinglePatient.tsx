import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import { PatientPrivateInfoIncluded } from '../types';
import { useStateValue } from '../state';
import { Icon } from "semantic-ui-react";

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

          dispatch({ type: "UPDATE_PATIENT", payload: patientPrivateInfo });
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

    const temp = Object.keys(patients);

    if (temp.length) {
      // https://semantic-ui.com/kitchen-sink.html
      return (
        <div>
          <h2 className="patient" >{patients[id].name}</h2>
          {patients[id].gender === "male"
            ?  <Icon className="icon" name="mars" size="big"/>
            :  <Icon className="icon" name="venus" size="big"/>
          }
          <ul>
            <li><b>DoB</b>: {patients[id].dateOfBirth}</li>
            <li><b>ID</b>: {patients[id].id}</li>
            <li><b>Occupation</b>: {patients[id].occupation}</li>
            <li><b>SSN</b>: {patients[id].ssn}</li>
            <li><b>Entries</b>: </li>
              <ul>
                {patients[id].entries?.map((entry) =>
                  // TODO type entries properly
                  // eslint-disable-next-line react/jsx-key
                  <li>{entry}</li>
                )}
              </ul>
          </ul>
        </div>
      );
    } else return null;
};

export default SinglePatient;