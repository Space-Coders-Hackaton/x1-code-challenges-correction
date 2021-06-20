import fs from 'fs';

async function fileExists(path: string) {  
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
}

export { fileExists };