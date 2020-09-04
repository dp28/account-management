import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";
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
    title: {
      fontSize: 14,
    },
  })
);

export function AddPerson() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addPerson({ name: { firstName, lastName } }));
  };

  return (
    <form className={classes.root} onSubmit={submit}>
      <Card>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Add new person
          </Typography>
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
        </CardContent>
        <CardActions>
          <Button type="submit">Add Person</Button>
        </CardActions>
      </Card>
    </form>
  );
}
