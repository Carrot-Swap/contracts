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
    neox: {
      url: "https://mainnet-1.rpc.banelabs.org",
      chainId: 47763,
      accounts: require("./secrets.json").privateKey,
      tags: ["mainnet"],
      saveDeployments: true,
      gasPrice: 40000000000,
    },
    neox_t4: {
      url: "https://neoxt4seed1.ngd.network",
      chainId: 12227332,
      accounts: require("./secrets.json").privateKey,
      tags: ["mainnet"],
      saveDeployments: true,
      gasPrice: 40000000000,
    },
    neo_testnet: {
      url: `https://neoxseed1.ngd.network/`,
      chainId: 12227331,
      accounts: require("./secrets.json").privateKey,
      saveDeployments: true,
      gasPrice: 10000000000,
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
    eth_sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      chainId: 11155111,
      accounts: require("./secrets.json").privateKey,
    },
    bnb_testnet: {
      url: "https://bsc-testnet.publicnode.com",
      chainId: 97,
      accounts: require("./secrets.json").privateKey,
    },
    mode_testnet: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts: require("./secrets.json").privateKey,
      saveDeployments: true,
      gasPrice: 10000000000,
    },
  },
  namedAccounts: {
    deployer: 0,
    tssUpdater: 0,
  },
};
