import { BigNumber, Contract } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { PAIRS, TOKENS } from "../../constants";
import { Token } from "../../constants/mock-tokens/Token";
import { MaxUINT, ZeroAddress } from "../../utils/constants";
import { toUnit } from "../../utils/formatter";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const mockTokens = TOKENS[hre.network.name];
  const pairs = PAIRS[hre.network.name];

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

  const router = await deployments.get("UniswapV2Router02");
  const routerContract = new ethers.Contract(
    router.address,
    router.abi,
    signer
  );
  const factory = await deployments.get("UniswapV2Factory");
  const factoryContract = new ethers.Contract(
    factory.address,
    factory.abi,
    signer
  );

  for (const pair of pairs) {
    const token1 = {
      ...tokenDeployments[pair.token1.symbol],
      amount: pair.token1.amount,
    };
    const token2 = {
      ...tokenDeployments[pair.token2.symbol],
      amount: pair.token2.amount,
    };
    const pairAddress1 = await factoryContract.getPair(
      token1.contract.address,
      token2.contract.address
    );

    if (pairAddress1 === ZeroAddress) {
      await factoryContract.createPair(
        token1.contract.address,
        token2.contract.address
      );
      await token1.contract.approve(router.address, MaxUINT);
      await token2.contract.approve(router.address, MaxUINT);
    }
    const pairAddress2 = await factoryContract.getPair(
      token1.contract.address,
      token2.contract.address
    );

    const pairArtifact = await deployments.getArtifact("UniswapV2Pair");
    const pairContract = new ethers.Contract(
      pairAddress2,
      pairArtifact.abi,
      signer
    );
    const totalSupply = await pairContract.totalSupply();
    if (BigNumber.from(totalSupply).gt(0)) {
      console.log(
        `${pair.token1.symbol}-${pair.token2.symbol} pair deployed(${pairAddress2})`
      );
      continue;
    }

    const deadline =
      (await ethers.provider.getBlock("latest")).timestamp + 1000;

    if (!token1.isNative && !token2.isNative) {
      await routerContract.addLiquidity(
        token1.contract.address,
        token2.contract.address,
        token1.amount,
        token2.amount,
        0,
        0,
        deployer,
        deadline
      );
    } else {
      const [native, other] = token1.isNative
        ? [token1, token2]
        : [token2, token1];
      await routerContract.addLiquidityETH(
        other.contract.address,
        other.amount,
        0,
        0,
        deployer,
        deadline,
        {
          value: native.amount,
        }
      );
    }
  }
};

func.tags = ["mainnet", "testnet"];

export default func;

async function deployToken(
  hre: HardhatRuntimeEnvironment,
  deployer: string,
  contractName: string,
  { name, symbol, decimals }: { name: string; symbol: string; decimals: number }
) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;
  const signer = await ethers.getSigner(deployer);

  const token = await deploy(contractName, {
    from: deployer,
    args: [name, symbol, decimals],
  });
  console.log(`${symbol} token is deployed(${token.address})`);
  const tokenContract = new ethers.Contract(token.address, token.abi, signer);

  console.log(tokenContract.address, "totalSupply");
  const totalSupply = await tokenContract.totalSupply();
  if (totalSupply == 0) {
    const receipt = await tokenContract.mint(deployer, toUnit(100000000));
    await receipt.wait();
  }
  return new ethers.Contract(token.address, token.abi, signer);
}
