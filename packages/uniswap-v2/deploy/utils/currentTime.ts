import { ethers } from "hardhat";

export const currentTime = async () => {
  const { timestamp } = await ethers.provider.getBlock("latest");
  return timestamp;
};
