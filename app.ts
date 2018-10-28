import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { morganStream } from './app/config/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import { v4 } from 'uuid';
import { addResponseBody } from './app/middlewares/responseBody';
import { handleValidationError } from './app/middlewares/errors';

import { router } from './app/routes';

const app = express();

/*
 * Add middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add request id to everything
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.id = v4();
  next();
});

// Get response body
app.use(addResponseBody);

// Customise logging
morgan.token('id', (req: Request) => {
  return req.id;
});

morgan.token('request-body', (req: Request) => {
  return req.body;
});

morgan.token('response-body', (_req: Request, res: Response) => {
  return res.body;
});

app.use(
  morgan((tokens: any, req: Request, res: Response): string => {
    return JSON.stringify({
      type: 'request',
      requestId: tokens.id(req, res),
      timestamp: tokens.date(req, res, 'iso'),
      remoteAddress: tokens['remote-addr'](req, res),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      httpVersion: tokens['http-version'](req, res),
      referrer: tokens.referrer(req, res),
      userAgent: tokens['user-agent'](req, res),
      status: tokens.status(req, res),
      body: tokens['request-body'](req, res),
    });
  },     morganStream),
);

app.use(
  morgan((tokens: any, req: Request, res: Response): string => {
    return JSON.stringify({
      type: 'response',
      requestId: tokens.id(req, res),
      timestamp: tokens.date(req, res, 'iso'),
      status: tokens.status(req, res),
      responseTime: tokens['response-time'](req, res),
      body: tokens['response-body'](req, res),
    });
  },     morganStream),
);

app.use(helmet());

// CORS
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(compression());

// Mount routes
app.use('/api', router);

app.get('/', (_, res) => {
  res.json({
    message: "Awesome! We're live debugging this!",
  });
});

app.use(handleValidationError);

export { app };
