import { getDeployer } from "../../env";
import { DeployedContract } from "../../tool/deploy";
import { deployConnector } from "./deployConnector";
import { deployTokenBridge } from "./deployTokenBridge";

export async function testnet() {
  // console.log(
  //   bigEndianToLittleEndian(
  //     "5452b3c46e756E8bcF482Ee6490dDcB9f5Ef83Df".padStart(64, "0")
  //   )
  // );
  // console.log(
  //   littleEndianToBigEndian(
  //     "42ba0093a0137c027f6c403fc22bb77a1692f9d30000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000a086010000000000000000000000000000000000000000000000000000000000"
  //   )
  // );
  const connector = await deployConnector();
  const bridge = await deployTokenBridge(connector.deployment.address, 999);
  await test(bridge);
}

async function test(bridge: DeployedContract) {
  // const rpcClient = getRPCClient();
  const deployer = getDeployer();

  // const neo = new experimental.nep17.NEOContract({
  //   rpcAddress: rpcClient.url,
  //   networkMagic: getNetworkMagic(),
  //   account: deployer,
  // });
  // await neo.transfer(
  //   deployer.address,
  //   wallet.getAddressFromScriptHash(bridge.deployment.address),
  //   1
  // );

  await bridge.contract.invoke("send", [
    deployer.address,
    "NgHovhdwXEK4KaFUsoXPTsMbxvj7rNuUio",
  ]);
}
