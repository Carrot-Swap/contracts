import { TokenDeployments } from "./getTokens";

export function convertToken(
  tokenDeployments: TokenDeployments,
  pair: {
    token1: { symbol: string; amount: number };
    token2: { symbol: string; amount: number };
  }
) {
  const token1 = {
    ...tokenDeployments[pair.token1.symbol],
    amount: pair.token1.amount,
  };
  const token2 = {
    ...tokenDeployments[pair.token2.symbol],
    amount: pair.token2.amount,
  };
  return { token1, token2 };
}
