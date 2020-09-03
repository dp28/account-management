import { generateId } from "./identity";
import { RootState } from "../projection";

export type ID = string;

export interface AnyActionOrEvent {
  type: string;
}

export interface Action<PayloadType> extends AnyActionOrEvent {
  type: string;
  payload: PayloadType;
}

export interface EventBase {
  id: ID;
  createdAt: Date;
}

export interface DomainEvent<PayloadType> extends EventBase, AnyActionOrEvent {
  type: string;
  payload: PayloadType;
}

export const VALIDATION_ERROR = "error/VALIDATION_ERROR";

export interface ValidationError {
  type: typeof VALIDATION_ERROR;
  message: string;
  action: Action<any>;
}

export function buildValidationError(
  message: string,
  action: Action<any>
): ValidationError {
  return {
    type: VALIDATION_ERROR,
    message,
    action,
  };
}

export interface PerformAction<ActionType, EventType> {
  (state: RootState, action: ActionType): Readonly<EventType> | ValidationError;
}

export function buildEventBase(): EventBase {
  return {
    id: generateId(),
    createdAt: new Date(),
  };
}
