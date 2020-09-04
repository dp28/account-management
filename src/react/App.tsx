import React from "react";
import "./App.css";
import { People } from "./features/people/People";
import { Grid, Container } from "@material-ui/core";

export const App = () => {
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
