import downloadURL, { DownloadOptions } from 'download';
import defaultBranch from 'default-branch';

interface IDownload {
  repoURL: string;
  destination: string;
  options?: DownloadOptions;
}

export async function downloadRepo({
  repoURL,
  destination,
  options
}: IDownload): Promise<Buffer> {
  try {
    const branch = await defaultBranch(repoURL);
    
    const url = `${repoURL}/archive/${branch}.zip`;
    
    return downloadURL(url, destination, {
      extract: true,
      strip: 1,
      ...options,
      headers: {
        accept: 'application/zip',
      }
    });
  } catch(err) {
    throw new Error(err);
  }
}