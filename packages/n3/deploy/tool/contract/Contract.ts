import NeonCore, { sc } from "@cityofzion/neon-core";
import { ContractDeploymentInfo } from "../types/ContractDeploymentInfo";
import { readCachedManifest } from "../util";
import { RawContract } from "./RawContract";

export async function Contract(deployment: ContractDeploymentInfo) {
  const manifest = await readCachedManifest(deployment.name, {
    name: deployment.deployedName,
  });
  if (!manifest) {
    throw new Error(`[${deployment.name}] Not found manifest file`);
  }
  const contract = new sc.BaseContract(
    deployment.address,
    manifest.abi.methods
  );

  const rawContract = await RawContract.create(deployment.address);

  return {
    invoke: async (
      operation: string,
      args: (
        | string
        | boolean
        | number
        | NeonCore.sc.ContractParam
        | NeonCore.sc.ContractParamJson
      )[],
      fee?: string
    ) => {
      console.log("[invoke]", operation, `with ${args.length} args`);
      const call = contract.call(operation, ...args);
      return rawContract.invoke(call.operation, call.args, fee);
    },
    call: async <T>(
      operation: string,
      ...args: (
        | string
        | boolean
        | number
        | NeonCore.sc.ContractParam
        | NeonCore.sc.ContractParamJson
      )[]
    ) => {
      const data = contract.call(operation, ...args);
      return rawContract.call<T>(data.operation, data.args);
    },
  };
}
