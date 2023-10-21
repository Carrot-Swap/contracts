import { u } from "@cityofzion/neon-core";
import { DeployedContract } from "../../tool/deploy";
import { deployConnector } from "./deployConnector";
import { deployTokenBridge } from "./deployTokenBridge";

export async function testnet() {
  const connector = await deployConnector();
  const bridge = await deployTokenBridge(connector.deployment.address, 999);
  await test(bridge);
}

async function test(bridge: DeployedContract) {
  await bridge.contract.invoke("send", [
    1,
    {
      type: "ByteArray",
      value: u.hex2base64("5452b3c46e756E8bcF482Ee6490dDcB9f5Ef83Df"),
    },
    12,
    100000,
  ]);
}
