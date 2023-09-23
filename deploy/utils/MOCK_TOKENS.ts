export const MOCK_TOKENS = {
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
  bNEO: {
    name: "NEO Burger",
    symbol: "bNEO",
    decimals: 18,
  },
};

export const PAIRS = [
  {
    token1: { symbol: "WBTC", amount: 100 },
    token2: { symbol: "USDT", amount: 2540000 },
  },
  {
    token1: { symbol: "WETH", amount: 1000 },
    token2: { symbol: "USDC", amount: 1640000 },
  },
  {
    token1: { symbol: "bNEO", amount: 100000 },
    token2: { symbol: "USDT", amount: 790000 },
  },
];
