import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  BRIDGE_ADDRESSES,
  CHAIN_ID_BY_NAME,
  CONNECTOR_ADDRESSES,
  TOKEN_ADDRESSES,
} from "../../constatns";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const connectorAddress = CONNECTOR_ADDRESSES[hre.network.name];
  const deployment = await deploy("TokenBridge", {
    from: deployer,
    args: [connectorAddress],
  });

  const contract = new ethers.Contract(
    deployment.address,
    deployment.abi,
    signer
  );

  const tokenAddresses = TOKEN_ADDRESSES[hre.network.name];
  for (const [id, address] of Object.entries(tokenAddresses)) {
    console.log("set token", address);
    await contract.setToken(id, address);
  }

  for (const [name, address] of Object.entries(BRIDGE_ADDRESSES)) {
    if (name === hre.network.name) {
      continue;
    }
    console.log("set interactor by chain", CHAIN_ID_BY_NAME[name], address);
    await contract.setInteractorByChainId(CHAIN_ID_BY_NAME[name], address);
  }
  console.log(hre.network.name, "Token Bridge deployed", deployment.address);
};

func.tags = ["mainnet", "testnet"];

export default func;
