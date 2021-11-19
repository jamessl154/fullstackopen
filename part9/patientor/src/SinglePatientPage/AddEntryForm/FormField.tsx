import React from 'react';
import { Field } from 'formik';
import { Form } from "semantic-ui-react";

export type EntryTypeOption = {
    value: "Hospital" | "OccupationalHealthcare" | "HealthCheck" ;
    label: string;
};

type EntrySelectProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
    // https://stackoverflow.com/a/65824149
    // define function type
    setEntryType: (value: string) => void;
};

export const EntrySelectField = ({
    name,
    label,
    options,
    setEntryType
}: EntrySelectProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field
        as="select"
        name={name}
        onChange={(e: { target: { value: string; }; }) => {
          setEntryType(e.target.value);
        }}
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

export type HealthRatingOption = {
  value: 0 | 1 | 2 | 3;
  label: string;
};

type HealthRatingSelectProps = {
  name: string;
  label: string;
  options: HealthRatingOption[];
  setFieldValue: (field: string, value: unknown) => void;
};

export const HealthRatingSelectField = ({
  name,
  label,
  options,
  setFieldValue
}: HealthRatingSelectProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field
      as="select"
      name={name}
      className="ui dropdown"
      // https://github.com/formium/formik/issues/1191
      // we need a number for healthCheckRating
      onChange={(e: { target: { value: string; }; }) => {
        setFieldValue(name, parseInt(e.target.value));
      }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);