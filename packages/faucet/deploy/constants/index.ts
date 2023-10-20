import { BigNumber } from "@ethersproject/bignumber";
import * as BNB_TESTNET from "./BNB_TESTNET";
import * as ETH_TESTNET from "./ETH_TESTNET";
import * as NEO_TESTNET from "./NEO_TESTNET";
import * as POLYGON_TESTNET from "./POLYGON_TESTNET";
import * as ZETA_TESTNET from "./ZETA_TESTNET";

export const AMOUNTS: Record<string, Record<string, BigNumber>> = {
  zeta_athens: ZETA_TESTNET.AMOUNTS,
  neo_testnet: NEO_TESTNET.AMOUNTS,
  bnb_testnet: BNB_TESTNET.AMOUNTS,
  eth_testnet: ETH_TESTNET.AMOUNTS,
  polygon_testnet: POLYGON_TESTNET.AMOUNTS,
} as const;
