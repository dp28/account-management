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

export interface DomainEvent<PayloadType> extends AnyActionOrEvent {
  type: string;
  payload: PayloadType;
  id: ID;
  createdAt: Date;
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

export type PerformAction = (
  state: RootState,
  action: Action<any>
) => Readonly<DomainEvent<any>> | Readonly<ValidationError>;

export function buildDomainEvent<Type extends string, Payload>(
  type: Type,
  payload: Payload
) {
  return {
    id: generateId(),
    createdAt: new Date(),
    type,
    payload,
  };
}

export function buildAction<Type extends string, Payload>(
  type: Type,
  payload: Payload
) {
  return {
    type,
    payload,
  };
}
