import { v4 as uuid } from 'uuid';

import { Queue } from '../lib/Queue';

interface IRequest {
  challenge_id: string;
  repository_url: string;
}

class SendChallengeService {
  async execute({ repository_url }: IRequest): Promise<void> {
    const uniqueID = uuid();
    
    const templatePath = `./tmp/template-${uniqueID}`;
    const codePath = `./tmp/code-${uniqueID}`;
    
    await Queue.add('TestsCorrection', {
      repository_url,
      templatePath,
      codePath
    });
  }
}

export { SendChallengeService };