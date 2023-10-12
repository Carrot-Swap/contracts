import { utils } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const faucet = await deploy("Faucet", {
    from: deployer,
    args: [
      [
        "0x0000000000000000000000000000000000000000",
        "0xe0114Bec0350947FB148007aDB8A42689b924143", // WBTC
        "0xbB2cF54C82a6d4137cD88eAF8ad1805D77b3D060", // WETH
        "0x214C329b6fDDD8Ed36Fcb1554AFa767147413C1c", // USDT
        "0x4a0284C70734ca3d1Af51Cac3D34f33547D1A65e", // USDC
        "0xc4E8419afEfb35C057eAC4F1B721e28b9baAEc3c", // bNEO
      ],
      [
        utils.parseEther("0.05"),
        utils.parseUnits("0.001", 8),
        utils.parseUnits("0.1", 18),
        utils.parseUnits("50", 6),
        utils.parseUnits("50", 6),
        utils.parseUnits("10", 18),
      ],
    ],
  });
  console.log("faucet", faucet.address);
};

func.tags = ["mainnet", "testnet"];

export default func;
