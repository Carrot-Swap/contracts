import { Contract } from "ethers";
import { convertToken } from "./convertToken";

export async function supplyInitialLP(
  ethers,
  { token1, token2 }: ReturnType<typeof convertToken>,
  routerContract: Contract,
  deployer: string
) {
  const deadline = (await ethers.provider.getBlock("latest")).timestamp + 1000;

  if (!token1.isNative && !token2.isNative) {
    await routerContract.addLiquidity(
      token1.contract.address,
      token2.contract.address,
      token1.amount,
      token2.amount,
      0,
      0,
      deployer,
      deadline
    );
  } else {
    const [native, other] = token1.isNative
      ? [token1, token2]
      : [token2, token1];
    await routerContract.addLiquidityETH(
      other.contract.address,
      other.amount,
      0,
      0,
      deployer,
      deadline,
      {
        value: native.amount,
      }
    );
  }
}
