import { Contract, ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { TOKENS, Token } from "../../constants";

export type TokenDeployments = Awaited<ReturnType<typeof getTokenDeployments>>;

export async function getTokenDeployments(
  network: string,
  deployments: HardhatRuntimeEnvironment["deployments"],
  signer: ethers.Signer
) {
  const mockTokens = TOKENS[network];
  const tokenDeployments: Record<string, Token & { contract: Contract }> = {};

  for (const [symbol, item] of Object.entries(mockTokens)) {
    if (!item.isNative) {
      const deployment = await deployments.get(symbol);
      const contract = new ethers.Contract(
        deployment.address,
        deployment.abi,
        signer
      );
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
}
