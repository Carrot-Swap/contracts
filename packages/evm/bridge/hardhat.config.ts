import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
import { hardhatBaseConfig } from "../../../hardhat.config.base";

const config: HardhatUserConfig = {
  ...hardhatBaseConfig,
};

export default config;
