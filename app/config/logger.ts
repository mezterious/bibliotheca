import winston, { format } from 'winston';
import { Options } from 'morgan';
// import { TransformableInfo } from 'logform';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

const consoleFormat = format.printf(
  (info): string => {
    return `${info.level}: ${JSON.stringify(info.message)}`;
  },
);

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.splat(), consoleFormat),
    }),
  );
}

const morganStream: Options = {
  stream: {
    write: (message: string) => {
      try {
        logger.info(JSON.parse(message));
      } catch (error) {
        logger.info(message);
      }
    },
  },
};

export { logger, morganStream };
