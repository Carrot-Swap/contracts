import { getDeployer } from "../../env";
import { deploy } from "../../tool/deploy";

export async function deployConnector() {
  const connector = await deploy("CarrotBridgeConnector");
  const deployer = getDeployer();

  const res = await connector.contract.call("pauserAddress");
  if (res.getAddress() !== "0x0000") {
    return connector;
  }

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
