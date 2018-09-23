import express from 'express';
import { router } from './app/routes';

const app = express();

app.use('/api', router);

app.get('/', (_, res) => {
  res.send("Awesome! We're live debugging this!");
});

export { app };
