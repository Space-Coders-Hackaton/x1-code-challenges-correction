import Queue from 'bull';

import { REDIS_URL } from '../config/redis';
import { ICorrectionDTO } from '../dtos/ICorrectionDTO';
import { SendChallengeService } from '../services/SendChallengeService';

const correctionQueue = new Queue('correction', REDIS_URL);

correctionQueue.process(50, async (job: Queue.Job<ICorrectionDTO>) => {
  const {
    user_id,
    challenge_slug,
    technology,
    difficulty,
    repository_url,
    template_url
  } = job.data;

  const sendChallenge = new SendChallengeService();

  const results = await sendChallenge.execute({
    user_id,
    challenge_slug,
    technology,
    difficulty,
    repository_url,
    template_url
  });

  return results;
});