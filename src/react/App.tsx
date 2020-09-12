import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Container } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { loadEvents } from "./communication";
import { People } from "./features/people/People";
import { Organisations } from "./features/organisations/Organisations";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

export const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const events = await loadEvents();
      console.debug("Loaded events", events);
      events.forEach(dispatch);
    })();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div className={classes.paper}>
              <People />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className={classes.paper}>
              <Organisations />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
