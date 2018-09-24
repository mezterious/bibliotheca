import express from 'express';
import cors from 'cors';
import { router } from './app/routes';

const app = express();

// Add middleware
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
