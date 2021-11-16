import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';

const SinglePatient = () => {

    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
      const fetchPatientPrivateInfo = async () => {
        try {
          // https://dmitripavlutin.com/javascript-object-destructuring/#5-aliases
          const { data: patientPrivateInfo } = await axios.get<Patient[]>(
            `${apiBaseUrl}/patients/${id}`
          );
          console.log(patientPrivateInfo);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientPrivateInfo();
    }, []);

    return (
        <div>TODO</div>
    );
};

export default SinglePatient;