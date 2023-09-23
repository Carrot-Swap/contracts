import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const multicall3 = await deploy("Multicall3", { from: deployer });
  console.log("multicall3", multicall3.address);
};

func.tags = ["mainnet", "testnet"];

export default func;
