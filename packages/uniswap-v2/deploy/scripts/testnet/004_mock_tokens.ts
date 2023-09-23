import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { toUnit } from "../../utils/formatter";
import { MaxUINT, ZeroAddress } from "../../utils/constants";
import { currentTime } from "../../utils/currentTime";
import { MOCK_TOKENS, PAIRS } from "../../utils/MOCK_TOKENS";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const tokenDeployments = {};
  for (const [symbol, item] of Object.entries(MOCK_TOKENS)) {
    tokenDeployments[symbol] = await deployToken(hre, deployer, item);
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

  for (const pair of PAIRS) {
    const token1 = tokenDeployments[pair.token1.symbol];
    const token2 = tokenDeployments[pair.token2.symbol];
    const token1Address = token1.address;
    const token2Address = token2.address;
    const pairAddress1 = await factoryContract.getPair(
      token1Address,
      token2Address
    );
    if (pairAddress1 != ZeroAddress) {
      console.log(
        `${pair.token1.symbol}-${pair.token2.symbol} pair deployed(${pairAddress1})`
      );
      continue;
    }
    const token1Amount = toUnit(
      pair.token1.amount,
      MOCK_TOKENS[pair.token1.symbol].decimals
    );
    const token2Amount = toUnit(
      pair.token2.amount,
      MOCK_TOKENS[pair.token2.symbol].decimals
    );

    await factoryContract.createPair(token2Address, token1Address);

    await token1.approve(router.address, MaxUINT);
    await token2.approve(router.address, MaxUINT);

    await routerContract.addLiquidity(
      token1Address,
      token2Address,
      token1Amount,
      token2Amount,
      0,
      0,
      deployer,
      (await ethers.provider.getBlock("latest")).timestamp + 1000
    );
    const pairAddress2 = await factoryContract.getPair(
      token1Address,
      token2Address
    );
    console.log(
      `${pair.token1.symbol}-${pair.token2.symbol} pair deployed(${pairAddress2})`
    );
  }
};

func.tags = ["mainnet", "testnet"];

export default func;

async function deployToken(
  hre: HardhatRuntimeEnvironment,
  deployer: string,
  { name, symbol, decimals }: { name: string; symbol: string; decimals: number }
) {
  const { ethers, deployments } = hre;
  const { deploy } = deployments;
  const signer = await ethers.getSigner(deployer);

  const token = await deploy(symbol.toUpperCase(), {
    from: deployer,
    args: [name, symbol, decimals],
  });
  console.log(`${symbol} token is deployed(${token.address})`);
  const tokenContract = new ethers.Contract(token.address, token.abi, signer);

  const totalSupply = await tokenContract.totalSupply();
  if (totalSupply == 0) {
    const receipt = await tokenContract.mint(deployer, toUnit(100000000));
    await receipt.wait();
  }
  return new ethers.Contract(token.address, token.abi, signer);
}
