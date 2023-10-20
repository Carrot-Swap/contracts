import { readdirSync } from "fs";
import { resolve } from "path";
import { getProjectPath } from "./getProjectPath";

export async function findFile(project: string, endsWith: string) {
  const basePath = await getProjectPath(project);
  const path = resolve(basePath, "bin/sc");
  const list = readdirSync(path);
  const target = list.find((i) => i.endsWith(endsWith))!;
  return resolve(path, target);
}
