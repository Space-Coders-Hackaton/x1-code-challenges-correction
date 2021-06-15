import { Router } from 'express';

import { SendChallengeController } from '../controllers/SendChallengeController';

const challengesRouter = Router();

const sendChallengeController = new SendChallengeController();

challengesRouter.post('/send', sendChallengeController.handle);

export { challengesRouter };