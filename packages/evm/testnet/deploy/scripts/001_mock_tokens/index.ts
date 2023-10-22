import { Contract } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { TOKENS, Token } from "../../constants";
import { deployToken } from "./deployToken";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const mockTokens = TOKENS[hre.network.name];

  const tokenDeployments: Record<string, Token & { contract: Contract }> = {};
  for (const [symbol, item] of Object.entries(mockTokens)) {
    if (!item.isNative) {
      const contract = await deployToken(hre, deployer, symbol, item);
      tokenDeployments[symbol] = { ...item, contract };
      continue;
    }
    const deployment = await deployments.get("WETH9");
    const contract = new ethers.Contract(
      deployment.address,
      deployment.abi,
      signer
    );
    tokenDeployments[symbol] = { ...item, contract };
  }
  return tokenDeployments;
};

func.tags = ["mainnet", "testnet"];

export default func;
