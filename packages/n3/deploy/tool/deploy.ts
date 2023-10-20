import type core from "@cityofzion/neon-core";
import { experimental } from "@cityofzion/neon-js";
import { getDeployer, getNetworkMagic, getRPCClient, getRPCUrl } from "../env";
import { cacheDeployed, checkIsChanged } from "./caching";
import { getDeployedInfo } from "./caching/getDeployedInfo";
import { Contract } from "./contract";
import { Config } from "./types/Config";
import { ContractDeploymentInfo } from "./types/ContractDeploymentInfo";
import { readManifest, readNEF } from "./util";
import { getContractAddress } from "./util/getContractAddress";
import { sleep } from "./util/sleep";

export interface DeployedContract {
  contract: Awaited<ReturnType<typeof Contract>>;
  deployment: ContractDeploymentInfo;
}

export async function deploy(
  project: string,
  config?: Config
): Promise<DeployedContract> {
  if (!(await checkIsChanged(project, config))) {
    console.log(`[${project}]`, "SKIP DEPLOY");
    const info = (await getDeployedInfo(project, config))!;
    const contract = await Contract(info);
    return { contract, deployment: info };
  }
  console.log(`[${project}]`, "START DEPLOY");
  const manifest = await readManifest(project, config);
  const nef = await readNEF(project);

  const txId = await deployContract(project, nef, manifest);
  const contractAddress = getContractAddress(nef, manifest);

  const result = {
    name: project,
    deployedName: config?.name ?? manifest.name,
    txId,
    address: contractAddress,
    serialized: nef.serialize(),
  };
  cacheDeployed(project, result, config);
  console.log(`[${project}]`, "DEPLOY SUCCESS");
  await sleep(500);
  const contract = await Contract(result);
  return { contract, deployment: result };
}

async function deployContract(
  project: string,
  nef: core.sc.NEF,
  manifest: core.sc.ContractManifest
) {
  const deployer = getDeployer();
  const config = {
    networkMagic: getNetworkMagic(),
    rpcAddress: getRPCUrl(),
    account: deployer,
  };
  try {
    const txId = await experimental.deployContract(nef, manifest, config);
    console.log(`[${project}]`, "TXID :", txId);
    await assertResult(txId);
    return txId;
  } catch (e) {
    if (String(e).includes("Contract Already Exists")) {
      return;
    }
    throw e;
  }
}

async function assertResult(txId: string) {
  const txLog = await getApplicationLog(txId);
  if (txLog.executions[0]?.vmstate !== "HALT") {
    throw new DeployFailedError(txLog);
  }
}

async function getApplicationLog(txId: string) {
  const rpcClient = getRPCClient();
  do {
    await sleep(2000);
    try {
      const txLog = await rpcClient.getApplicationLog(txId);
      return txLog;
    } catch {}
  } while (true);
}

class DeployFailedError extends Error {
  constructor(public readonly txLog: core.rpc.ApplicationLogJson) {
    super();
  }
}
