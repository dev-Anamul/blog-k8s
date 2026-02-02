import * as winston from 'winston';

export const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, context }) => {
      return `${timestamp} [${level}] ${context ? `[${context}] ` : ''}${message}`;
    }),
  ),
});
