import dotenv from "dotenv";
dotenv.config();

export const hardhatBaseConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
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
    neo_testnet: {
      url: "https://evm.ngd.network:32331",
      chainId: 2970385,
      accounts: require("./secrets.json").privateKey,
      gas: 30000001,
      saveDeployments: true,
    },
    zeta_athens: {
      url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
      chainId: 7001,
      accounts: require("./secrets.json").privateKey,
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai-bor.publicnode.com",
      chainId: 80001,
      accounts: require("./secrets.json").privateKey,
    },
    eth_goril: {
      url: "https://ethereum-goerli.publicnode.com",
      chainId: 5,
      accounts: require("./secrets.json").privateKey,
    },
    bnb_testnet: {
      url: "https://bsc-testnet.publicnode.com",
      chainId: 97,
      accounts: require("./secrets.json").privateKey,
    },
  },
  namedAccounts: {
    deployer: 0,
    tssUpdater: 0,
  },
};
