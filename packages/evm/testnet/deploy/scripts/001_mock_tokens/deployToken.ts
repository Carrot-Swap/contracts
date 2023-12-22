import { HardhatRuntimeEnvironment } from "hardhat/types";
import { toUnit } from "../../utils/formatter";

export async function deployToken(
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

  const totalSupply = await tokenContract.totalSupply();
  if (totalSupply == 0) {
    const receipt = await tokenContract.mint(deployer, toUnit(100000000));
    await receipt.wait();
  }
  return new ethers.Contract(token.address, token.abi, signer);
}
