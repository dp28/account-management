import React from "react";
import { useSelector } from "react-redux";
import { Person, selectPeople } from "../../../domain";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

type Props = {
  onChange: (person: Person) => void;
  required?: boolean;
};

export function PersonSelector({ onChange, required = true }: Props) {
  const peopleMap = useSelector(selectPeople);
  const people = Object.values(peopleMap);

  return (
    <FormControl>
      <InputLabel id="select-person-label">Person</InputLabel>
      <Select
        labelId="select-person-label"
        required={required}
        onChange={(event) => onChange(peopleMap[event.target.value as string])}
      >
        {people.map((person) => (
          <MenuItem key={person.id} value={person.id}>
            {person.name.firstName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
