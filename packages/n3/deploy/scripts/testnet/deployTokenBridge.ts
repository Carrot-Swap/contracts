import { getDeployer } from "../../env";
import { deploy } from "../../tool/deploy";

export async function deployTokenBridge(
  connectorAddress: string,
  currentChainId: number
) {
  const deployer = getDeployer();
  const bridge = await deploy("TokenBridge", { name: "Test6" });
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
    "NU7LRUDw7xoPFHiytzp7JFN2JRKq4FPbj7",
  ]);
  return bridge;
}
