import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const HospitalComponent = ({ date, specialist, description, discharge, diagnosisCodes }: HospitalEntry) => {
    return(
      <Segment>
        <h4 className="inline" >{date}</h4>
        {' '}<Icon name='hospital outline' size="big"/>
        <p><i>{description}</i></p>
        <h4>Seen by: {specialist}</h4>
        {discharge
          ? <>
              <h4>Discharge: </h4>
                <ul>
                  <li><u>Date: </u>{discharge.date}</li>
                  <li><u>Criteria: </u>{discharge.criteria}</li>
                </ul>
            </>
          : null
        }
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
      </Segment>
    );
};

export default HospitalComponent;


{/* <ul>
{patients[id].entries?.map((entry) =>
  <li key={entry.id}>
    {entry.date} <i>{entry.description}</i>
    <p>Seen by: {entry.specialist}</p>
      {entry.diagnosisCodes
        ? <ul>
            <dt><h5><u>Diagnoses codes: </u></h5></dt>
            {entry.diagnosisCodes.map((code) =>
              <li key={code}>{code}</li>
            )}
          </ul>
        : null
      }
  </li>
)}
</ul> */}