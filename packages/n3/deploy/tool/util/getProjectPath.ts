import { resolve } from "path";
import { promisify } from "util";

const cache: Record<string, string> = {};

export async function getProjectPath(project: string) {
  if (cache[project]) {
    return cache[project];
  }
  const target = await findFile("contracts", `${project}.csproj`);
  if (!target) {
    throw new Error(`Project can't find [${project}]`);
  }
  const path = target.substring(0, target.lastIndexOf("/"));
  cache[project] = path;
  return path;
}

const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function findFile(
  dir: string,
  target: string
): Promise<string | undefined> {
  const subdirs = await readdir(dir);
  const files = await Promise.all<{ isDir: boolean; target: string }>(
    subdirs.map(async (subdir: string) => {
      const res = resolve(dir, subdir);
      const isDir = (await stat(res)).isDirectory();
      return { isDir, target: res };
    })
  );
  const res = files.find((i) => !i.isDir && i.target.endsWith(target))?.target;
  if (res) {
    return res;
  }
  for (const dir of files.filter((i) => i.isDir)) {
    const res3 = await findFile(dir.target, target);
    if (res3) {
      return res3;
    }
  }
}
