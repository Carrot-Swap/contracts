import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const signer = ethers.provider.getSigner(deployer);

  const feeConfig = await deploy("FeeGovernance", { from: deployer });

  const factory = await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer, feeConfig.address],
  });

  console.log(`FeeGovernance is deployed(${feeConfig.address})`);
  console.log(`UniswapV2Factory is deployed(${factory.address})`);

  const contract = new ethers.Contract(factory.address, factory.abi, signer);
  console.log("INIT_CODE_HASH", await contract.pairCodeHash());
};

func.tags = ["mainnet", "testnet"];

export default func;
