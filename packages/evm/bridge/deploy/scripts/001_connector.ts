import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { tssUpdater, deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(tssUpdater);
  const TSS_ADDRESS = "0x0163FDb1Fe7A0bFf3c3EaA30dfDdf1EAB66630e0";

  const connector = await deploy("CarrotBridgeConnectorNonFee", {
    from: deployer,
    args: [TSS_ADDRESS, tssUpdater, TSS_ADDRESS],
  });

  const contract = new ethers.Contract(
    connector.address,
    connector.abi,
    signer
  );
  await contract.updateTssAddress(TSS_ADDRESS);
  console.log(`Bridge Connector deploted(${connector.address})`);
};

func.tags = ["mainnet", "testnet"];

export default func;
