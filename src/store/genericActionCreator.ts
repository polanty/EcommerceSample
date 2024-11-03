import { AnyAction } from "redux-saga";

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type actionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type actionWithoutPayload<T> = {
  type: T;
};

// Overload signatures for createAction
export function createAction<T extends string>(
  type: T,
  payload: void
): actionWithoutPayload<T>;

export function createAction<T extends string, P>(
  type: T,
  payload: P
): actionWithPayload<T, P>;

// Implementation of createAction
export function createAction<T extends string, P>(type: T, payload?: P) {
  if (payload === undefined) {
    return { type };
  } else {
    return { type, payload };
  }
}

// this is for the normal action for redux without typescript
// export const createAction = ({type, payload}) => ({ type, payload });
