import core from "@cityofzion/neon-core";
import { experimental, u } from "@cityofzion/neon-js";
import { getDeployer } from "../../env";

export function getContractAddress(
  nef: core.sc.NEF,
  manifest: core.sc.ContractManifest
) {
  return experimental.getContractHash(
    u.HexString.fromHex(getDeployer().scriptHash),
    nef.checksum,
    manifest.name
  );
}
