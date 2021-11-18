import React from 'react';
import { Field } from 'formik';
import { Form } from "semantic-ui-react";

export type EntryTypeOption = {
    value: "Hospital" | "OccupationalHealthcare" | "HealthCheck" ;
    label: string;
};

type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
    // https://stackoverflow.com/a/65824149
    setEntryType: (value: string) => void;
};

export const SelectField = ({
    name,
    label,
    options,
    setEntryType
}: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field
        as="select"
        name={name}
        onChange={(e: { target: { value: string; }; }) => setEntryType(e.target.value)}
        className="ui dropdown"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
);
