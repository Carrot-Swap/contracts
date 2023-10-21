import { u } from "@cityofzion/neon-core";
import { DeployedContract } from "../../tool/deploy";
import {
  bigEndianToLittleEndian,
  littleEndianToBigEndian,
} from "../../tool/util/endian-util";
import { deployConnector } from "./deployConnector";
import { deployTokenBridge } from "./deployTokenBridge";

export async function testnet() {
  const connector = await deployConnector();
  const bridge = await deployTokenBridge(connector.deployment.address, 999);
  await test(bridge);
}

async function test(bridge: DeployedContract) {
  const res = await bridge.contract.call(
    "send",
    1,
    { type: "ByteArray", value: "0x5452b3c46e756E8bcF482Ee6490dDcB9f5Ef83Df" },
    12,
    100000
  );
  //@ts-ignore
  const hex = u.base642hex(res.notifications[0].state.value[5].value);
  console.log(hex);
  console.log(littleEndianToBigEndian(hex));
  console.log(bigEndianToLittleEndian(littleEndianToBigEndian(hex)));
}
