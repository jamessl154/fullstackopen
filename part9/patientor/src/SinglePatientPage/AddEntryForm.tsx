import React from 'react';
import axios from 'axios';
import { Entry, Patient } from '../types';
import { Grid, Button, Form } from "semantic-ui-react";
import { Field, Formik } from "formik";
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { apiBaseUrl } from '../constants';
import { addEntryToPatient, useStateValue } from '../state';
import { useParams } from 'react-router';


// structure of a single option
type EntryTypeOption = {
    value: "Hospital" | "OccupationalHealthcare" | "HealthCheck" ;
    label: string;
};
  
  // props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
};

const SelectField = ({
    name,
    label,
    options
}: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
);

const entryOptions: EntryTypeOption[] = [
    { value: "Hospital", label: "Hospital Admission" },
    { value: "OccupationalHealthcare", label: "Occupational Health Visit" },
    { value: "HealthCheck", label: "Health Checkup" }
];

// maybe a reset button to clear all fields
const AddEntryForm = () => {
    const [{ diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const submitNewEntry = async (entry: Entry) => {
        try {
            const { data: patientWithNewEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                entry
            );
            dispatch(addEntryToPatient(patientWithNewEntry));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        // maybe state needs to be here?
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                id: "",
                description: "",
                date: "",
                specialist: "",
                // not sure how to deal with this
                diagnosisCodes: [""],
                employerName: ""
            }}
            onSubmit={submitNewEntry}
            validate={values => {
                // runs before the form is submitted
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.id) errors.id = requiredError;
                if (!values.description) errors.description = requiredError;
                if (!values.date) errors.date = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui segment inverted">
                        <h1>New Entry</h1>
                        <SelectField
                            label="Entry Type"
                            name="entry"
                            options={entryOptions}
                        />
                        <Field
                            label="Entry ID"
                            placeholder="Q2Q-WE1-QQA-S5A"
                            name="id"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="19-01-21"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Enter a description"
                            name="description"
                            component={TextField}
                        />
                        <Field 
                            label="Specialist"
                            placeholder="MD House"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            // TODO Optional Field
                            // no select values present
                            // maybe initialize diagnosis codes from
                            // /api/diagnoses
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            // TODO Optional field
                            label="Employer"
                            placeholder="Google"
                            name="employerName"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="blue"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;