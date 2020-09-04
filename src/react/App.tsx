import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Container } from "@material-ui/core";
import { loadEvents } from "./communication";
import { People } from "./features/people/People";
import { Organisations } from "./features/organisations/Organisations";
import "./App.css";

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
          <Organisations />
        </Grid>
      </Container>
    </div>
  );
};
