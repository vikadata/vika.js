export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface Logger {
  (level: LogLevel, message: string, extraInfo: Record<string, unknown>): void
}

export function makeLogger(name: string): Logger {
  return (level, message, extraInfo) => {
    console[level](`${name} ${level}:`, message, extraInfo);
  };
}
