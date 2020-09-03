import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer } from "../../domain";
import { actionPerformerMiddleware } from "./actionPerformerMiddleware";

export const store = configureStore({
  reducer,
  middleware: [actionPerformerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
