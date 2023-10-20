import { Contract } from "ethers";
import { MaxUINT, ZeroAddress } from "../../utils/constants";
import { convertToken } from "./convertToken";

export async function createPair(
  factory: Contract,
  router: Contract,
  tokens: ReturnType<typeof convertToken>
) {
  const { token1, token2 } = tokens;

  const pairAddress = await factory.getPair(
    token1.contract.address,
    token2.contract.address
  );

  if (pairAddress !== ZeroAddress) {
    return pairAddress;
  }

  await factory.createPair(token1.contract.address, token2.contract.address);
  await token1.contract.approve(router.address, MaxUINT);
  await token2.contract.approve(router.address, MaxUINT);
  return await factory.getPair(
    token1.contract.address,
    token2.contract.address
  );
}
