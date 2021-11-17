import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareComponent = ({ date, specialist, description, employerName, diagnosisCodes, sickLeave }: OccupationalHealthcareEntry) => {
  return(
    <Segment>
      <h4 className="inline" >{date}</h4>
      {' '}<Icon name='medkit' size="big"/>
      <p><i>{description}</i></p>
      <h4>Seen by: <b>{specialist}</b></h4>
      <h4>Employer: {employerName}</h4>
      {diagnosisCodes
          ? <>
              <h4>Diagnosis Codes:</h4>
              <ul>
                {diagnosisCodes.map((code) =>
                  <li key={code}>{code}</li>
                )}
              </ul>
            </>
          : null
        }
        {sickLeave
          ? <>
              <h4>Sick Leave: </h4>
                <ul>
                  <li><u>Start: </u>{sickLeave.startDate}</li>
                  <li><u>End: </u>{sickLeave.endDate}</li>
                </ul>
            </>
          : null
        }
    </Segment>
  );
};

export default OccupationalHealthcareComponent;