import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { morganStream } from './app/config/logger';
import bodyParser from 'body-parser';
import { v4 } from 'uuid';

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

// Customise logging
morgan.token('id', (req: Request) => {
  return req.id;
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
      // body: tokens.body(req, res),
    });
  },     morganStream),
);

// CORS
app.use(
  cors({
    origin: ['http://localhost:3001'],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type'],
  }),
);

// Mount routes
app.use('/api', router);

app.get('/', (_, res) => {
  res.json({
    message: "Awesome! We're live debugging this!",
  });
});

export { app };
