import 'dotenv/config';

import express from 'express';

import { challengesRouter } from './routes/challenges.routes';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/challenges', challengesRouter);

app.listen(port, () => {
  console.log('🚀 Server listening on PORT', port);
});