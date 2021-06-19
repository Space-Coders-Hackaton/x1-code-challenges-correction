import { Queue } from '../lib/Queue';

interface IRequest {
  user_id: string;
  repository_url: string;
  challenge_slug: string;
  difficulty: string;
  technology: string;
  template_url: string;
}

class SendChallengeService {
  async execute({
    user_id,
    repository_url,
    challenge_slug,
    difficulty,
    technology,
    template_url
  }: IRequest): Promise<void> {
    await Queue.add('TestsCorrection', {
      user_id,
      repository_url,
      challenge_slug,
      difficulty,
      technology,
      template_url
    });
  }
}

export { SendChallengeService };