import { ICorrectionDTO } from '../dtos/ICorrectionDTO';

import { Queue } from '../lib/Queue';

export class SendChallengeService {
  async execute({
    user_id,
    repository_url,
    challenge_slug,
    difficulty,
    technology,
    template_url
  }: ICorrectionDTO): Promise<void> {
    await Queue.add('ChallengeCorrection', {
      user_id,
      repository_url,
      challenge_slug,
      difficulty,
      technology,
      template_url
    });
  }
}