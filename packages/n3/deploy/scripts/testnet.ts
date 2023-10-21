import { getDeployer } from "../env";
import { deploy } from "../tool/deploy";

export async function testnet() {
  const connector = await deployConnector();
  await deployTokenBridge(connector.deployment.address, 999);
}

async function deployConnector() {
  const connector = await deploy("CarrotBridgeConnector");
  const deployer = getDeployer();

  const tssAddress = deployer.address;
  const tssAddressUpdater = deployer.address;
  const pauserAddress = deployer.address;

  const res = await connector.contract.call("pauserAddress");
  console.log(res.getAddress());
  if (res.getAddress() === "0x0000") {
    await connector.contract.invoke("initialize", [
      tssAddress,
      tssAddressUpdater,
      pauserAddress,
    ]);
  }
  return connector;
}

async function deployTokenBridge(
  connectorAddress: string,
  currentChainId: number
) {
  const deployer = getDeployer();
  const bridge = await deploy("TokenBridge", { name: "Test" });
  bridge.contract.invoke("initilize", [
    deployer.address,
    connectorAddress,
    currentChainId,
  ]);
}
