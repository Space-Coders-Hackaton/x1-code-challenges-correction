import { Router } from 'express';

import { checkAuthorizationToken } from '../middlewares/checkAuthorizationToken';
import { SendChallengeService } from '../services/SendChallengeService';

const correctionRoutes = Router();

const sendChallenge = new SendChallengeService();

correctionRoutes.use(checkAuthorizationToken)

correctionRoutes.post('/send', async (request, response) => {
  const {
    user_id,
    challenge_slug,
    difficulty,
    technology,
    repository_url,
    template_url
  } = request.body;

  try {
    await sendChallenge.execute({ 
      user_id,
      challenge_slug,
      difficulty,
      technology,
      repository_url,
      template_url
    });
  
    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
});

export { correctionRoutes };