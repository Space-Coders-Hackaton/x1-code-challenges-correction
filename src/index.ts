import 'dotenv/config';

import express from 'express';
import { challengesRouter } from './routes/correction.routes';

const app = express();

app.use(express.json());

app.use('/', challengesRouter);

app.listen(8080, () => {
  console.log('🚀 Server listening on PORT 3333!');
});