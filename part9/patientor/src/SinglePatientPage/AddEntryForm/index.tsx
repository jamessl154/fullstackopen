import React, { useState } from 'react';
import axios from 'axios';
import { Entry, Patient } from '../../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField } from '../../AddPatientModal/FormField';
import { apiBaseUrl } from '../../constants';
import { addEntryToPatient, useStateValue } from '../../state';
import { useParams } from 'react-router';
import { EntryTypeOption, SelectField } from './FormField';

const entryOptions: EntryTypeOption[] = [
    { value: "OccupationalHealthcare", label: "Occupational Health Visit" },
    { value: "Hospital", label: "Hospital Admission" },
    { value: "HealthCheck", label: "Health Checkup" }
];

// maybe a reset button to clear all fields
const AddEntryForm = () => {
    const [{ diagnoses }, dispatch] = useStateValue();
    // local state to render fields corresponding to the selected entry type
    const [entryType, setEntryType] = useState("OccupationalHealthcare");

    const { id } = useParams<{ id: string }>();

    const submitNewEntry = async (entry: Entry) => {
        // console.log(entry);
        try {
            const { data: patientWithNewEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                entry
            );
            // console.log(patientWithNewEntry);
            dispatch(addEntryToPatient(patientWithNewEntry));
        } catch (e) {
            console.log(e);
        }
    };

    const baseValues = {
        type: entryType,
        id: "",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
    };

    let initialValues: Entry;

    if (entryType === "OccupationalHealthcare") {
        initialValues = {
            ...baseValues,
            type: "OccupationalHealthcare",
            employerName: "",
            sickLeave: {
                startDate: "",
                endDate: ""
            }
        };
    } else if (entryType === "Hospital") {
        initialValues = {
            ...baseValues,
            type: "Hospital",
            discharge: { date: "", criteria: "" }
        };
    } else {
        initialValues = {
            ...baseValues,
            type: "HealthCheck",
            healthCheckRating: 1
        };
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={submitNewEntry}
            validate={values => {
                // runs before the form is submitted
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.id) errors.id = requiredError;
                if (!values.description) errors.description = requiredError;
                if (!values.date) errors.date = requiredError;
                if (!values.specialist) errors.specialist = requiredError;
                // Deep nesting for validating with state
                // if (state === "hospital" && !values.healthCheckRating) ...
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
                            setEntryType={setEntryType}
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
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {entryType === "OccupationalHealthcare"
                            ? <div>
                                <Field
                                    // Required field
                                    label="Employer"
                                    placeholder="Google"
                                    name="employerName"
                                    component={TextField}
                                />
                                <h3>Sick Leave</h3>
                                <Field
                                    // Optional field
                                    label="Start date"
                                    placeholder="12-09-21"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                                <Field
                                    // Optional field
                                    label="End date"
                                    placeholder="12-11-21"
                                    name="sickLeave.endDate"
                                    component={TextField}
                                />
                              </div>
                            : null}
                        {entryType === "TODO"
                            ? <Field
                                // TODO Optional field
                                label="Employer"
                                placeholder="Google"
                                name="employerName"
                                component={TextField}
                              />
                            : null}
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