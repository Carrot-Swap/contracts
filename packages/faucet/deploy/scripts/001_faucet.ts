import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { AMOUNTS } from "../constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const addresses = Object.keys(AMOUNTS[hre.network.name]);
  const amounts = Object.values(AMOUNTS[hre.network.name]);
  console.log(addresses, amounts);

  const faucet = await deploy("Faucet", {
    from: deployer,
    args: [addresses, amounts],
  });
  console.log("faucet", faucet.address);
};

func.tags = ["mainnet", "testnet"];

export default func;
