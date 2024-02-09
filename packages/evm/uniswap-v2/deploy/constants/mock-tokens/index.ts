export * from "./Token";
import * as NEO_TESTNET from "./NEO_TESTNET";
import { Token } from "./Token";
import * as ZETA_ATHENE from "./ZETA_ATHENE";
import * as ETH_SEPOLIA from "./ETH_SEPOLIA";

export const PAIRS = {
  neo_testnet: NEO_TESTNET.PAIRS,
  zeta_athens: ZETA_ATHENE.PAIRS,
  eth_sepolia: ETH_SEPOLIA.PAIRS,
} as const;

export const TOKENS: Record<string, Record<string, Token>> = {
  neo_testnet: NEO_TESTNET.MOCK_TOKENS,
  zeta_athens: ZETA_ATHENE.MOCK_TOKENS,
  eth_sepolia: ETH_SEPOLIA.MOCK_TOKENS,
};
