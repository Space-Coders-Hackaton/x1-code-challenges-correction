import rimraf from 'rimraf';
import { promisify } from 'util';
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import { runCLI } from 'jest';
import { exec } from 'child_process';
import { AggregatedResult } from '@jest/test-result';
import { downloadRepo } from '../downloadRepo';

interface IRequest {
  challenge_id: string;
  repository_url: string;
}

const runCommand = promisify(exec);
const deleteFolder = promisify(rimraf);

class SendChallengeService {
  async execute({ challenge_id, repository_url }: IRequest): Promise<AggregatedResult> {
    const uniqueID = uuid();
    
    const templatePath = `./tmp/template-${uniqueID}`;
    const codePath = `./tmp/code-${uniqueID}`;
    
    // Find template repository URL

    // Download template repository
    await downloadRepo({
      repoURL: 'https://github.com/Space-Coders-Hackaton/challenge-template',
      destination: templatePath
    });

    // Download user repository
    await downloadRepo({
      repoURL: repository_url,
      destination: codePath
    });

    // Delete jest config from user repository
    await deleteFolder(`${codePath}/src/__tests__`);
    await fs.unlink(`${codePath}/jest.config.js`);  

    // Move jest config from template to user
    await fs.rename(`${templatePath}/src/__tests__`, `${codePath}/src/__tests__`);
    await fs.rename(`${templatePath}/jest.config.js`, `${codePath}/jest.config.js`);

    await deleteFolder(templatePath);

    // Join user directory and install dependencies
    await runCommand(`cd ${codePath} && yarn && yarn add jest@^26.6.3`)

    // Run test suite
    const testResults = await runCLI({
      json: true,
      silent: true,
      reporters: [],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    } as any, [codePath]);

    await deleteFolder(codePath);

    return testResults.results;
  }
}

export { SendChallengeService };