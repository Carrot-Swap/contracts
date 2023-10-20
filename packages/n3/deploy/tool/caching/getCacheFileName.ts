import { Config } from "../types/Config";

export function getCacheFileName(project: string, config?: Config) {
  const name = config?.name
    ? `${project}_${config.name}.json`
    : `${project}.json`;
  return name;
}
