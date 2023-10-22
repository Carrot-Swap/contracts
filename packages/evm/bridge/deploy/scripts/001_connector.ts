import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const connector = await deploy("CarrotBridgeConnectorNonFee", {
    from: deployer,
    args: [deployer, deployer, deployer],
  });
  console.log(`Bridge Connector deploted(${connector.address})`);
};

func.tags = ["mainnet", "testnet"];

export default func;
