import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { v4 } from 'uuid';

import { router } from './app/routes';

const app = express();

morgan.token('id', (req: Request) => {
  return req.id;
});

morgan.format(
  'kitchen-sink',
  // tslint:disable-next-line:max-line-length
  ':date[iso] :id :http-version :method :url :referrer :remote-addr :remote-user :response-time :status',
);

// Add middleware
app.use((req, _res, next) => {
  req.id = v4();
  next();
});
app.use(morgan('kitchen-sink'));
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
