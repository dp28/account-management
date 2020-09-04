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
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { addOrganisation } from "../../../domain";

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

export function AddOrganisation() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addOrganisation({ name }));
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
            Add new organisation
          </Typography>
          <TextField
            id="organisationName"
            required
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button type="submit">Add Organisation</Button>
        </CardActions>
      </Card>
    </form>
  );
}
