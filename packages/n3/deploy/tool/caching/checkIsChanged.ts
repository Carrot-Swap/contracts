import { Config } from "../types/Config";
import { readNEF } from "../util";
import { getDeployedInfo } from "./getDeployedInfo";

export async function checkIsChanged(project: string, config?: Config) {
  const info = await getDeployedInfo(project, config);
  if (!info) {
    return true;
  }
  const nefFile = await readNEF(project);
  return nefFile.serialize() !== info.serialized;
}
