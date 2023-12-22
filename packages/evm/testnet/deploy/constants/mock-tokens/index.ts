export * from "./Token";
import * as NEO_TESTNET from "./NEO_TESTNET";
import { Token } from "./Token";
import * as ZETA_ATHENE from "./ZETA_ATHENE";
import * as MODE_TESTNET from "./MODE_TESTNET";

export const PAIRS = {
  neo_testnet: NEO_TESTNET.PAIRS,
  zeta_athens: ZETA_ATHENE.PAIRS,
  mode_testnet: MODE_TESTNET.PAIRS,
} as const;

export const TOKENS: Record<string, Record<string, Token>> = {
  neo_testnet: NEO_TESTNET.MOCK_TOKENS,
  zeta_athens: ZETA_ATHENE.MOCK_TOKENS,
  mode_testnet: MODE_TESTNET.MOCK_TOKENS,
};
