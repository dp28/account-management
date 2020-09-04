import { Dispatch } from "redux";
import { DomainEvent, isDomainEvent } from "../../domain";
import { persistEvent } from "../communication";

export const persistenceMiddleware = (store: any) => (
  next: Dispatch
) => (actionOrEvent: { type: string }) => {
  if (isDomainEvent(actionOrEvent)) {
    persist(actionOrEvent);
  }
  next(actionOrEvent);
};

function persist(event: DomainEvent<any>): void {
  console.debug("Persisting", event);
  persistEvent(event);
}
