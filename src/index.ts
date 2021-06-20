import 'dotenv/config';

import express from 'express';
import { correctionRoutes } from './routes/correction.routes';

const app = express();

app.use(express.json());

app.use('/', correctionRoutes);

app.listen(3333, () => {
  console.log('🚀 Server listening on PORT 3333!');
});