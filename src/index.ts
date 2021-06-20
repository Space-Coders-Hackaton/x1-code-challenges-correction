import 'dotenv/config';

import express from 'express';

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log('🚀 Server listening on PORT 3333!');
});