import { Action as ReduxAction } from "@reduxjs/toolkit";
import { generateId } from "./identity";
import { RootState } from "../state";

export type ID = string;

export interface Action<Type, PayloadType> extends ReduxAction<Type> {
  type: Type;
  payload: PayloadType;
}

export interface EventBase {
  id: ID;
  createdAt: Date;
}

export interface DomainEvent<Type, PayloadType> extends EventBase {
  type: Type;
  payload: PayloadType;
}

export const VALIDATION_ERROR = "error/VALIDATION_ERROR";

export interface ValidationError {
  type: typeof VALIDATION_ERROR;
  message: string;
  action: ReduxAction<string>;
}

export function buildValidationError(
  message: string,
  action: ReduxAction<string>
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

export const buildActionType = (name: string) => `action/${name}`;
export const buildEventType = (name: string) => `event/${name}`;

export const buildActionEventPair = (
  actionName: string,
  eventType: string
): [string, string] => [buildActionType(actionName), buildEventType(eventType)];
