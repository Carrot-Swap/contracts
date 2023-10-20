import { getDeployer } from "../env";
import { deploy } from "../tool/deploy";

export async function testnet() {
  const connector = await deployConnector();
}

async function deployConnector() {
  const connector = await deploy("CarrotBridgeConnector");
  const deployer = getDeployer();

  const tssAddress = deployer.address;
  const tssAddressUpdater = deployer.address;
  const pauserAddress = deployer.address;

  await connector.contract.invoke("initialize", [
    tssAddress,
    tssAddressUpdater,
    pauserAddress,
  ]);
  return connector;
}
