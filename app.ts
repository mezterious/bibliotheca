import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { morganStream } from './app/config/logger';
import { v4 } from 'uuid';

import { router } from './app/routes';

const app = express();

morgan.token('id', (req: Request) => {
  return req.id;
});

morgan.format(
  'my-format',
  // tslint:disable-next-line:max-line-length
  ':date[iso] :id :method :url :status :referrer :remote-addr :remote-user :response-time',
);

// Add middleware
app.use((req, _res, next) => {
  req.id = v4();
  next();
});
app.use(morgan('my-format', morganStream));
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
