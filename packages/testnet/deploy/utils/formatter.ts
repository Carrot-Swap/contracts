import { ethers } from "ethers";
import { BigNumberish } from "@ethersproject/bignumber";

export const fromUnit = (amount: any, unit: string | BigNumberish = "ether") =>
  ethers.utils.formatUnits(amount.toString(), unit.toString());
export const toUnit = (amount: any, unit: BigNumberish = "ether") =>
  ethers.utils.parseUnits(amount.toString(), unit);
export const toComma = (amount: any) => ethers.utils.commify(amount.toString());
