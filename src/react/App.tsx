import React, { useEffect } from "react";
import "./App.css";
import { People } from "./features/people/People";
import { Grid, Container } from "@material-ui/core";
import { loadEvents } from "./communication";
import { useDispatch } from "react-redux";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const events = await loadEvents();
      console.debug("Loaded events", events);
      events.forEach(dispatch);
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Grid container>
          <People />
        </Grid>
      </Container>
    </div>
  );
};
