import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { PAIRS } from "../../constants";
import { ADDRESSES } from "../../constants/addresses";
import { convertToken } from "./convertToken";
import { createPair } from "./createPair";
import { getTokenDeployments } from "./getTokens";
import { supplyInitialLP } from "./supplyInitialLP";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const addresses = ADDRESSES[hre.network.name];

  if (!addresses) {
    return;
  }
  const { router, factory } = addresses;

  const tokenDeployments = await getTokenDeployments(
    hre.network.name,
    deployments,
    signer
  );
  const pairs = PAIRS[hre.network.name];

  const routerContract = await ethers.getContractAt(
    "IUniswapV2Router02",
    router,
    signer
  );
  const factoryContract = await ethers.getContractAt(
    "IUniswapV2Factory",
    factory,
    signer
  );

  for (const pair of pairs) {
    const tokens = convertToken(tokenDeployments, pair);
    const pairAddress = await createPair(
      factoryContract,
      routerContract,
      tokens
    );

    const pairArtifact = await deployments.getArtifact("UniswapV2Pair");
    const pairContract = new ethers.Contract(
      pairAddress,
      pairArtifact.abi,
      signer
    );
    const totalSupply = await pairContract.totalSupply();
    if (BigNumber.from(totalSupply).gt(0)) {
      console.log(
        `${pair.token1.symbol}-${pair.token2.symbol} pair deployed(${pairAddress})`
      );
      continue;
    }

    await supplyInitialLP(ethers, tokens, routerContract, deployer);
  }
};

func.tags = ["mainnet", "testnet"];

export default func;
