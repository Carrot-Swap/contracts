import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { Config } from "../types/Config";
import { ContractDeploymentInfo } from "../types/ContractDeploymentInfo";
import { getCacheDirPath } from "./getCacheDirPath";
import { getCacheFileName } from "./getCacheFileName";

export async function getDeployedInfo(
  project: string,
  config?: Config
): Promise<ContractDeploymentInfo | undefined> {
  const name = getCacheFileName(project, config);
  const path = resolve(getCacheDirPath(), name);
  if (!existsSync(path)) {
    return;
  }
  const file = readFileSync(path);
  return JSON.parse(file.toString());
}
