import rimraf from 'rimraf';
import { promises as fs } from 'fs';
import { runCLI } from 'jest';
import { promisify } from 'util';
import { exec } from 'child_process';

import { downloadRepo } from '../utils/downloadRepo';

interface IData {
  repository_url: string;
  templatePath: string;
  codePath: string;
}

const runCommand = promisify(exec);
const deleteFolder = promisify(rimraf);

const TestsCorrection = {
  key: 'TestsCorrection',
  options: {
    attempts: 2
  },
  async handle({ data }) {
    const { repository_url, templatePath, codePath } = data as IData;    

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
  }
}

export { TestsCorrection };