import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import { DomainState } from "../../domain";

type Props = {
  label: string;
  selector: (state: DomainState) => string[];
  onValueChange: (value: string) => void;
  textFieldProps?: TextFieldProps;
};

export function SuggestInput({
  label,
  selector,
  onValueChange,
  textFieldProps,
}: Props) {
  const options = useSelector(selector);

  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={(_event, value) => onValueChange(value)}
      renderInput={(params) => (
        <TextField
          {...(textFieldProps || {})}
          {...params}
          label={label}
          margin="normal"
        />
      )}
    />
  );
}
