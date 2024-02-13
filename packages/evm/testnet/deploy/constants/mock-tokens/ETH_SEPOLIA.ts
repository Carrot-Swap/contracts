import { Token } from "./Token";

export const MOCK_TOKENS: Record<string, Token> = {
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
  },
  ETH: {
    name: "Sepolia Ethereum",
    symbol: "ETH",
    decimals: 18,
    isNative: true,
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
  NEO: {
    name: "NEO",
    symbol: "NEO",
    decimals: 18,
  },
  GAS: {
    name: "GAS",
    symbol: "GAS",
    decimals: 18,
  },
  MATIC: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  BNB: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};

export const PAIRS = [
  {
    token1: { symbol: "WBTC", amount: 1 * 1e8 * 1000 },
    token2: { symbol: "USDT", amount: 46192 * 1e6 * 100000 },
  },
  {
    token1: { symbol: "USDC", amount: 1 * 1e6 * 10000000 },
    token2: { symbol: "USDT", amount: 1 * 1e6 * 10000000 },
  },
  {
    token1: { symbol: "ETH", amount: "1000000000000000000000" },
    token2: { symbol: "USDC", amount: 2450 * 1e6 * 500 },
  },
  {
    token1: { symbol: "NEO", amount: "1000000000000000000000000" },
    token2: { symbol: "USDT", amount: 11.92 * 1e6 * 1000000 },
  },
  {
    token1: { symbol: "GAS", amount: "1000000000000000000000" },
    token2: { symbol: "USDT", amount: 6.05 * 1e6 * 1000 },
  },
  {
    token1: { symbol: "MATIC", amount: "1000000000000000000000" },
    token2: { symbol: "USDT", amount: 0.87 * 1e6 * 100000 },
  },
  {
    token1: { symbol: "BNB", amount: "1000000000000000000000" },
    token2: { symbol: "USDC", amount: 323 * 1e6 * 100000 },
  },
];
