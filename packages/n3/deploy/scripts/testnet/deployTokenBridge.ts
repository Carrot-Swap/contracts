import { getDeployer } from "../../env";
import { deploy } from "../../tool/deploy";

export async function deployTokenBridge(
  connectorAddress: string,
  currentChainId: number
) {
  const deployer = getDeployer();
  const bridge = await deploy("TokenBridge", { name: "Test3" });
  const res = await bridge.contract.call("connectorAddress");
  console.log(res.getAddress());
  if (res.getAddress() !== "0x0000") {
    return bridge;
  }
  await bridge.contract.invoke("initilize", [
    deployer.address,
    connectorAddress,
    currentChainId,
  ]);
  return bridge;
}
