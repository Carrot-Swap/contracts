import { sc } from "@cityofzion/neon-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { getCacheDirPath } from "../caching/getCacheDirPath";
import { Config } from "../types/Config";
import { findFile } from "./findManifest";

export async function readManifest(project: string, config?: Config) {
  const manifestFile = await findFile(project, "manifest.json");
  const data = JSON.parse(readFileSync(manifestFile) as unknown as string);
  const manifest = sc.ContractManifest.fromJson(data);
  if (config?.name) {
    manifest.name = config.name;
  }
  return manifest;
}

export async function readCachedManifest(project: string, config?: Config) {
  const path = resolve(getCacheDirPath(), `${project}.manifest.json`);
  if (!existsSync(path)) {
    return;
  }
  const data = JSON.parse(readFileSync(path) as unknown as string);
  const manifest = sc.ContractManifest.fromJson(data);
  if (config?.name) {
    manifest.name = config.name;
  }
  return manifest;
}
