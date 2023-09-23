import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const WETH = await deploy("WETH9", { from: deployer });
  console.log(`WETH is deployed(${WETH.address})`);
};

func.tags = ["mainnet", "testnet"];

export default func;
