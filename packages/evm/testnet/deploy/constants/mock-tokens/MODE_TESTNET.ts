import { Token } from "./Token";

export const MOCK_TOKENS: Record<string, Token> = {
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
  },
  WETH: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    decimals: 18,
  },
  USDT: {
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
  },
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
  },
  ETH: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
    isNative: true,
  },
};

export const PAIRS = [
  {
    token1: { symbol: "WBTC", amount: 1 * 1e8 * 1000 },
    token2: { symbol: "USDT", amount: 44000 * 1e6 * 100000 },
  },
  {
    token1: { symbol: "USDC", amount: 1 * 1e6 * 10000000 },
    token2: { symbol: "USDT", amount: 1 * 1e6 * 10000000 },
  },
  {
    token1: { symbol: "WETH", amount: "1000000000000000000000" },
    token2: { symbol: "USDC", amount: 2300 * 1e6 * 500 },
  },
  {
    token1: { symbol: "ETH", amount: "100000000000000000" },
    token2: { symbol: "USDC", amount: 230 * 1e6 },
  },
];
