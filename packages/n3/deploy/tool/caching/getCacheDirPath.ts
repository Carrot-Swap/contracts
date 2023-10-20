import { resolve } from "path";
import { getTargetNetwork } from "../../env";

export function getCacheDirPath() {
  const network = getTargetNetwork();
  return resolve(".cache", network);
}
