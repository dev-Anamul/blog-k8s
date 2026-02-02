import type { Request, Response } from 'express';
import { WinstonModule } from 'nest-winston';
import { consoleTransport } from './console.transport';
import { fileTransports } from './file.transport';

// winston logger config
export const winstonLoggerConfig = WinstonModule.createLogger({
  transports: [consoleTransport, ...fileTransports],
});

// morgan formatter
export const customMorganFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Custom Morgan stream for Winston
export const morganStream = {
  write: (message: string) => {
    winstonLoggerConfig.log('info', message.trim());
  },
};

export const morganConfig = {
  stream: morganStream,
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  format: customMorganFormat,
};
