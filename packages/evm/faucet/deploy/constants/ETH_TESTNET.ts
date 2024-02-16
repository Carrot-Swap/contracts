import { utils } from "ethers";

export const AMOUNTS = {
  "0x0000000000000000000000000000000000000000": utils.parseEther("0.001"),
  "0x8FE487DeEb85881B92419FCE51576d137b517b4c": utils.parseUnits("0.001", 8), // WBTC
  "0xc3Be4c39028B9C5a9c41144942D5761789088263": utils.parseUnits("50", 6), // USDT
  "0xF2124eF2fb12beBabC3C546411299C1Bbd82E7e6": utils.parseUnits("50", 6), // USDC
  "0x10bB478E563936D43d83F09eE59C4B9bdaD04B71": utils.parseUnits("10", 18), // NEO
  "0x5Ce6d37F9Bb6ec941E634A301cc41117686d65e5": utils.parseUnits("10", 18), // GAS
};
