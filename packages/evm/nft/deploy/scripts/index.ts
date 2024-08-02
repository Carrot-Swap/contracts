import { HardhatRuntimeEnvironment } from "hardhat/types";
import { chunk } from "lodash";
import { earlyBunnyList } from "./earlyBunny";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const deployment = await deploy("CarrotNFT", {
    from: deployer,
    args: ["https://carrot-fi.xyz/static/nft.json"],
    gasPrice: "1100000007",
  });

  console.log(hre.network.name, "Carrot NFT", deployment.address);

  const contract = new ethers.Contract(
    deployment.address,
    deployment.abi,
    signer
  );
  await contract.putUri(
    "https://d33a9e3wpmgydo.cloudfront.net/carrot/nft/{id}.json",
    {
      gasPrice: "1100000007",
    }
  );
  // for (const parts of chunk(earlyBunnyList, 50)) {
  //   await contract.mintBatch(
  //     2,
  //     parts.map((i: { address: string }) => i.address),
  //     {
  //       gasPrice: "1100000007",
  //     }
  //   );
  //   console.log(parts[parts.length - 1].address);
  // }
};

func.tags = ["mainnet", "testnet"];

export default func;
