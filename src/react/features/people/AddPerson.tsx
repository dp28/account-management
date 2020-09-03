import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addPerson } from "../../../domain";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export function AddPerson() {
  const styles = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addPerson({ name: { firstName, lastName } }));
  };

  return (
    <form className={styles.root} onSubmit={submit}>
      <h2>Add new person</h2>
      <TextField
        id="firstName"
        required
        label="First name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        id="lastName"
        required
        label="Last name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <Button type="submit">Add Person</Button>
    </form>
  );
}
