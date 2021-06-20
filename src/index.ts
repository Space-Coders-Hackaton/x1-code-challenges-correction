import 'dotenv/config';

import express from 'express';
import './jobs/ChallengeCorrectionJob';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.listen(port, () => {
  console.log('🚀 Server listening on PORT', port);
});