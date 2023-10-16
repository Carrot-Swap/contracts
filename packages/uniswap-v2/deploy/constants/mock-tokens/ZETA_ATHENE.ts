import { Token } from "./Token";

export const MOCK_TOKENS: Record<string, Token> = {
  WBTC: {
    name: "Carrot Testnet Bitcoin",
    symbol: "cBTC",
    decimals: 8,
  },
  WETH: {
    name: "Carrot Testnet Ethereum",
    symbol: "cETH",
    decimals: 18,
  },
  USDT: {
    name: "Carrot Testnet Tether",
    symbol: "cUSDT",
    decimals: 6,
  },
  USDC: {
    name: "Carrot Testnet USD Coin",
    symbol: "cUSDC",
    decimals: 6,
  },
  ZETA: {
    name: "ZETA",
    symbol: "ZETA",
    decimals: 18,
    isNative: true,
  },
};

export const PAIRS = [
  {
    token1: { symbol: "WBTC", amount: 1 * 1e8 * 1000 },
    token2: { symbol: "USDT", amount: 25400 * 1e6 * 100000 },
  },
  {
    token1: { symbol: "USDC", amount: 1 * 1e6 * 10000000 },
    token2: { symbol: "USDT", amount: 1 * 1e6 * 10000000 },
  },
  {
    token1: { symbol: "WETH", amount: "1000000000000000000000" },
    token2: { symbol: "USDC", amount: 1640 * 1e6 * 500 },
  },
  {
    token1: { symbol: "ZETA", amount: "50000000000000000000" },
    token2: { symbol: "USDT", amount: "5000000000" },
  },
];
