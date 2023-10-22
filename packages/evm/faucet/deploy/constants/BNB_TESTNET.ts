import { utils } from "ethers";

export const AMOUNTS = {
  "0x0000000000000000000000000000000000000000": utils.parseEther("0.001"),
  "0x448E44C7E99c6dD8337766ccDB550Da393fd4be8": utils.parseUnits("0.001", 8), //WBTC
  "0xE2eD730beFC63f9f04f83180adf55979C0Bfe41a": utils.parseUnits("0.1", 18), //WETH
  "0x3541B555c468ff69a36748E3930A0f6E35D3E4a6": utils.parseUnits("50", 6), //USDT
  "0x0d20D2E505EFA9011A967BC029eF703f2CAd8723": utils.parseUnits("50", 6), //USDC
};
