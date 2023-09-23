import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const factory = await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer],
  });
  console.log(`UniswapV2Factory is deployed(${factory.address})`);
};

func.tags = ["mainnet", "testnet"];

export default func;
