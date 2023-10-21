import { CONST } from "@cityofzion/neon-core";
import { deployConnector } from "./deployConnector";
import { deployTokenBridge } from "./deployTokenBridge";

export async function testnet() {
  const connector = await deployConnector();
  await deployTokenBridge(
    connector.deployment.address,
    CONST.MAGIC_NUMBER.TestNet
  );
}
