import * as ZETA_TESTNET from "./ZETA_TESTNET";
import * as NEO_TESTNET from "./NEO_TESTNET";

export const AMOUNTS = {
  zeta_athens: ZETA_TESTNET.AMOUNTS,
  neo_testnet: NEO_TESTNET.AMOUNTS,
} as const;
