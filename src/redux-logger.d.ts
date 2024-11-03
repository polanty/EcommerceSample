// src/redux-logger.d.ts
declare module "redux-logger" {
  import { Middleware } from "redux";

  interface ReduxLoggerOptions {
    predicate?: (getState: () => any, action: any) => boolean;
    collapsed?:
      | boolean
      | ((getState: () => any, action: any, logEntry: any) => boolean);
    duration?: boolean;
    timestamp?: boolean;
    level?: "log" | "console" | "warn" | "error" | "info" | "debug";
    colors?: {
      title?: boolean | ((action: any) => string);
      prevState?: boolean | ((prevState: any) => string);
      action?: boolean | ((action: any) => string);
      nextState?: boolean | ((nextState: any) => string);
      error?: boolean | ((error: any) => string);
    };
    titleFormatter?: (action: any, time: string, took: number) => string;
    stateTransformer?: (state: any) => any;
    actionTransformer?: (action: any) => any;
    errorTransformer?: (error: any) => any;
    logger?: Console;
    logErrors?: boolean;
    diff?: boolean;
    diffPredicate?: (getState: () => any, action: any) => boolean;
  }

  export function createLogger(options?: ReduxLoggerOptions): Middleware;
}
