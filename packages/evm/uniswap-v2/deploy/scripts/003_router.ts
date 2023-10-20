import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const factory = await deployments.get("UniswapV2Factory");
  const WETH = await deployments.get("WETH9");
  const router = await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factory.address, WETH.address],
  });
  console.log(`UniswapV2Router02 is deployed(${router.address})`);
};

func.tags = ["mainnet", "testnet"];

export default func;
