import React, { useState } from 'react';
import axios from 'axios';
import { Patient } from '../../types';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { DiagnosisSelection, TextField } from '../../AddPatientModal/FormField';
import { apiBaseUrl } from '../../constants';
import { addEntryToPatient, useStateValue } from '../../state';
import { useParams } from 'react-router';
import { EntryTypeOption, EntrySelectField, HealthRatingOption, HealthRatingSelectField } from './FormField';

const entryOptions: EntryTypeOption[] = [
    { value: "OccupationalHealthcare", label: "Occupational Health Visit" },
    { value: "Hospital", label: "Hospital Admission" },
    { value: "HealthCheck", label: "Health Checkup" }
];

const healthRatingOptions: HealthRatingOption[] = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "Low Risk" },
    { value: 2, label: "High Risk" },
    { value: 3, label: "Critical Risk" }
];

const AddEntryForm = () => {
    const [{ diagnoses }, dispatch] = useStateValue();
    // local state to render fields corresponding to the selected entry type
    const [entryType, setEntryType] = useState("OccupationalHealthcare");

    const { id } = useParams<{ id: string }>();

    const submitNewEntry = async (entry: unknown) => {
        try {
            const { data: patientWithNewEntry } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                entry
            );
            dispatch(addEntryToPatient(patientWithNewEntry));
        } catch (e) {
            if (axios.isAxiosError(e)) console.log(e.response?.data);
        }
    };

    /*
        // https://formik.org/docs/api/formik#initialvalues-values
        Warning: A component is changing an uncontrolled input of type text to be controlled.
        Got this error when changing initialvalues to have different properties i.e. conditionally
        rendering input fields. The solution I used here is to have initialValues for all possible fields
        and have the server create an entry object depending on the entryType state here
        after validating the required fields for that specific entryType exist.
    */

    // https://github.com/formium/formik/issues/811
    // when enableReinitialize is true we can change initialValues in
    // response to entryType state change
    const initialValues = {
        type: entryType,
        id: "",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: undefined,
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate: ""
        },
        discharge: {
            date: "",
            criteria: ""
        },
        healthCheckRating: 0
    };

    return (
        <Formik
            enableReinitialize={true}
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
                        <EntrySelectField
                            // Required Field
                            label="Entry Type"
                            name="type"
                            options={entryOptions}
                            setEntryType={setEntryType}
                        />
                        <Field
                            // Required Field
                            label="Entry ID"
                            placeholder="Q2Q-WE1-QQA-S5A"
                            name="id"
                            component={TextField}
                        />
                        <Field
                            // Required Fields
                            label="Date"
                            placeholder="19-01-21"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            // Required Field
                            label="Description"
                            placeholder="Enter a description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            // Required Field
                            label="Specialist"
                            placeholder="MD House"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            // Optional Field
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
                                <h2>Sick Leave</h2>
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
                        {entryType === "Hospital"
                            ? <div>
                                <h2>Discharge</h2>
                                <Field
                                    // Optional field
                                    label="Date discharged"
                                    placeholder="12-20-12"
                                    name="discharge.date"
                                    component={TextField}
                                />
                                <Field
                                    // Optional field
                                    label="Reason for discharge"
                                    placeholder="Patient is already at full health"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                              </div>
                            : null}
                        {entryType === "HealthCheck"
                            ? <div>
                                <HealthRatingSelectField
                                    // Required Field
                                    label="Health Rating"
                                    name="healthCheckRating"
                                    options={healthRatingOptions}
                                    setFieldValue={setFieldValue}
                                />
                              </div>
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