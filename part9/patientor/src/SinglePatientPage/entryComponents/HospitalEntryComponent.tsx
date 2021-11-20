import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from '../../state';
import { HospitalEntry } from '../../types';

const HospitalComponent = ({ date, specialist, description, discharge, diagnosisCodes }: HospitalEntry) => {
  const [{diagnoses}] = useStateValue();

  if (Object.keys(diagnoses).length) {
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
                  <li key={code}>{code} {diagnoses[code].name}</li>
                )}
              </ul>
            </>
          : null
        }
      </Segment>
    );
  } else return null;
};

export default HospitalComponent;