import { getDeployer } from "../../env";
import { deploy } from "../../tool/deploy";

export async function deployTokenBridge(
  connectorAddress: string,
  currentChainId: number
) {
  const deployer = getDeployer();
  const bridge = await deploy("TokenBridge");
  const res = await bridge.contract.call("connectorAddress");
  if (!!res.getValue()) {
    return bridge;
  }
  await bridge.contract.invoke("initilize", [
    deployer.address,
    connectorAddress,
    currentChainId,
  ]);
  await bridge.contract.invoke("setEVMInteractorAddress", [
    "NMjzPHVR1CtsgYGV6rmSsKM42avxrUA7yk",
  ]);
  await bridge.contract.invoke("putTokenId", [
    "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
    894710606,
  ]);
  return bridge;
}
