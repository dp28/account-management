import { Dispatch } from "redux";
import { isAction } from "../../domain/framework";
import { DomainState, performAction } from "../../domain";

export const actionPerformerMiddleware = (store: {
  getState: () => DomainState;
}) => (next: Dispatch) => (actionOrEvent: { type: string }) => {
  if (isAction(actionOrEvent)) {
    const eventOrError = performAction(store.getState(), actionOrEvent);
    next(eventOrError);
  } else {
    next(actionOrEvent);
  }
};
