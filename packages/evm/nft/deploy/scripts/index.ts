import { HardhatRuntimeEnvironment } from "hardhat/types";
import { chunk } from "lodash";
import { EARLY_BUNNY_TARGETS } from "../constants";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const deployment = await deploy("CarrotNFT", {
    from: deployer,
    args: [],
  });

  console.log(hre.network.name, "Carrot NFT", deployment.address);

  const contract = new ethers.Contract(
    deployment.address,
    deployment.abi,
    signer
  );
  for (const parts of chunk(EARLY_BUNNY_TARGETS, 20)) {
    await contract.mintBatch(parts, 0);
  }
};

func.tags = ["mainnet", "testnet"];

export default func;
