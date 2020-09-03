import { Dispatch } from "redux";
import { Action } from "../../domain/framework";
import { performAction } from "../../domain/actions";
import { DomainState } from "../../domain";

export const actionPerformerMiddleware = (store: {
  getState: () => DomainState;
}) => (next: Dispatch) => (action: Action<any>) => {
  const eventOrError = performAction(store.getState(), action);
  next(eventOrError);
};
