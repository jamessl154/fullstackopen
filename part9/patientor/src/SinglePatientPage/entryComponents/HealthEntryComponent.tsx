import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { HealthCheckEntry } from '../../types';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

const HealthCheckComponent = ({ date, specialist, description, healthCheckRating, diagnosisCodes }: HealthCheckEntry) => {

    let color: SemanticCOLORS;

    switch(healthCheckRating) {
        case(0):
            color = 'green';
            break;
        case(1):
            color = 'yellow';
            break;
        case(2):
            color = 'orange';
            break;
        case(3):
            color = 'red';
            break;
        default:
            color = 'black';
    }

    return(
        <Segment>
            <h4 className="inline" >{date}</h4>
            {' '}<Icon name='heartbeat' size="big"/>
            <p><i>{description}</i></p>
            <h4>Seen by: <b>{specialist}</b></h4>
            <h4>Health: <Icon name="heart" color={color} /></h4>
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

export default HealthCheckComponent;