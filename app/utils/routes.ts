import { readdir, writeFile } from 'node:fs/promises';

const PATH_TO_APP_PATHS = 'app/utils/app-path.generated.ts';
const PATHS_PATH = 'app/routes';

async function collectFiles(currentPaths: string[], currentPath = '') {
  const glob = await readdir(PATHS_PATH + currentPath, { withFileTypes: true });
  for (const entry of glob) {
    if (entry.isFile()) {
      currentPaths.push(currentPath + '/' + entry.name);
    } else if (entry.isDirectory()) {
      await collectFiles(currentPaths, currentPath + '/' + entry.name);
    }
  }
}

// NOTE: the `withoutNamespacing` regex only removes top level namespacing like routes/__auth but
// wouldn't catch namespacing like routes/my/__new-namespace
function filenameToRoute(filename: string): string {
  let output = filename.split(/.tsx?$/)[0];
  output = output.replace(/_[^.]*\./, '');
  output = output.replace('.', '/');
  return output;
}

export async function generateRoutes() {
  const filenames: string[] = [];
  await collectFiles(filenames);
  await writeFile(PATH_TO_APP_PATHS, `export type AppPath =\n`);

  const remixRoutes = filenames.map(filenameToRoute).filter((v) => !['/_index', '/_templates'].includes(v));
  // only unique routes, and alphabetized please
  const routes = [...new Set(remixRoutes)].sort();
  return routes;
}
