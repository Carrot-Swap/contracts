import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Config } from "../types/Config";
import { ContractDeploymentInfo } from "../types/ContractDeploymentInfo";
import { findFile } from "../util/findManifest";
import { getCacheDirPath } from "./getCacheDirPath";
import { getCacheFileName } from "./getCacheFileName";

export function cacheDeployed(
  project: string,
  data: ContractDeploymentInfo,
  config?: Config
) {
  const dirPath = getCacheDirPath();
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  copyManifest(project);

  const name = getCacheFileName(project, config);
  writeFileSync(resolve(dirPath, name), JSON.stringify(data));
}

async function copyManifest(project: string) {
  const dirPath = getCacheDirPath();
  const targetFile = await findFile(project, ".manifest.json");
  const destPath = resolve(dirPath, `${project}.manifest.json`);
  copyFileSync(targetFile, destPath);
}
