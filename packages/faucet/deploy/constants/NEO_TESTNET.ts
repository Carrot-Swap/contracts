import { utils } from "ethers";

export const AMOUNTS = {
  "0x0000000000000000000000000000000000000000": utils.parseEther("0.05"),
  "0xe0114Bec0350947FB148007aDB8A42689b924143": utils.parseUnits("0.001", 8), // WBTC
  "0xbB2cF54C82a6d4137cD88eAF8ad1805D77b3D060": utils.parseUnits("0.1", 18), // WETH
  "0x214C329b6fDDD8Ed36Fcb1554AFa767147413C1c": utils.parseUnits("50", 6), // USDT
  "0x4a0284C70734ca3d1Af51Cac3D34f33547D1A65e": utils.parseUnits("50", 6), // USDC
  "0xc4E8419afEfb35C057eAC4F1B721e28b9baAEc3c": utils.parseUnits("10", 18), // bNEO
};
