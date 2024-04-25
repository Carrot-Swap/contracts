import { HardhatRuntimeEnvironment } from "hardhat/types";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const deployment = await deploy("CarrotNFT", {
    from: deployer,
    args: [],
  });

  console.log(hre.network.name, "Carrot NFT", deployment.address);
};

func.tags = ["mainnet", "testnet"];

export default func;
