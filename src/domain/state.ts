import { PeopleState, InitialState as InitialPeopleState } from "./people";

export interface RootState {
  people: PeopleState;
}

export const InitialRootState: RootState = {
  people: InitialPeopleState,
};
