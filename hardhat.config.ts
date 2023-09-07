import { HardhatUserConfig } from "hardhat/config";

import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";

require("hardhat-contract-sizer");

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://evm.ngd.network:32331", // testnet node
      },
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
        initialIndex: 0,
        accountsBalance: "10000000000000000000000000",
      },
    },
    neo_evm: {
      url: "https://evm.ngd.network:32331",
      chainId: 2970385,
      accounts: require("./secrets.json").privateKey,
      gas: 30000001,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
