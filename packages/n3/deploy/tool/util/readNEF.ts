import { sc } from "@cityofzion/neon-js";
import { readFileSync } from "fs";
import { findFile } from "./findManifest";

export async function readNEF(project: string) {
  const file = await findFile(project, ".nef");
  const buffer = readFileSync(file, null);
  return sc.NEF.fromBuffer(buffer);
}
