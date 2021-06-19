import rimraf from 'rimraf';
import { runCLI } from 'jest';
import { promisify } from 'util';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import axios from 'axios';

import { downloadRepo } from '../utils/downloadRepo';

interface IData {
  user_id: string;
  repository_url: string;
  challenge_slug: string;
  difficulty: string;
  technology: string;
  template_url: string;
}

const runCommand = promisify(exec);
const deleteFolder = promisify(rimraf);

const TestsCorrection = {
  key: 'TestsCorrection',
  options: {
    attempts: 2
  },
  async handle({ data }) {
    const {
      user_id,
      repository_url,
      challenge_slug,
      difficulty,
      technology,
      template_url
    } = data as IData;  
    const uniqueID = uuid();    
    
    const templatePath = `./tmp/template-${uniqueID}`;
    const codePath = `./tmp/code-${uniqueID}`;

    await downloadRepo({
      repoURL: template_url,
      destination: templatePath
    });

    await downloadRepo({
      repoURL: repository_url,
      destination: codePath
    });

    await deleteFolder(`${codePath}/src/__tests__`);
    await fs.unlink(`${codePath}/jest.config.js`);  

    await fs.rename(`${templatePath}/src/__tests__`, `${codePath}/src/__tests__`);
    await fs.rename(`${templatePath}/jest.config.js`, `${codePath}/jest.config.js`);

    await deleteFolder(templatePath);

    await runCommand(`cd ${codePath} && yarn && yarn add jest@^26.6.3`)

    const testResults = await runCLI({
      json: true,
      silent: true,
      reporters: [],
      testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    } as any, [codePath]);

    await deleteFolder(codePath);

    const { numTotalTests, numPassedTests } = testResults.results;

    await axios.post(`${process.env.API_URL}/corrections`, {
      user_id,
      challenge_slug,
      difficulty,
      technology,
      total_tests: numTotalTests,
      passed_tests: numPassedTests,
      repository_url,
    });
  }
}

export { TestsCorrection };