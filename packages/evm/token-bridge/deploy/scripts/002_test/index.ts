// import { HardhatRuntimeEnvironment } from "hardhat/types";

// const func = async function (hre: HardhatRuntimeEnvironment) {
//   const { ethers, deployments, getNamedAccounts } = hre;
//   const { deployer } = await getNamedAccounts();
//   const signer = await ethers.getSigner(deployer);

//   const deployment = await deployments.get("TokenBridge");
//   const contract = new ethers.Contract(
//     deployment.address,
//     deployment.abi,
//     signer
//   );

//   const tx = await signer.sendTransaction({
//     to: deployment.address,
//     data: contract.interface.encodeFunctionData("sendETH", [
//       "0x5452b3c46e756E8bcF482Ee6490dDcB9f5Ef83Df",
//       2970385,
//     ]),
//     value: 0.0000001 * 1e18,
//   });
//   console.log(tx.hash);
//   await tx.wait();
// };

// func.tags = ["testnet"];

// export default func;
