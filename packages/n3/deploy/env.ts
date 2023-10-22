import { CONST, rpc, wallet } from "@cityofzion/neon-core";
import { config } from "dotenv";

config();

export function getDeployer() {
  return new wallet.Account(process.env.PRIVATE_KEY);
}

export function getTargetNetwork() {
  return process.argv[2];
}

export function getNetworkMagic() {
  switch (getTargetNetwork()) {
    case "mainnet":
      return CONST.MAGIC_NUMBER.MainNet;
    default:
      return CONST.MAGIC_NUMBER.TestNet;
  }
}

export function getRPCClient() {
  return new rpc.RPCClient(getRPCUrl());
}

export function getRPCUrl() {
  switch (getTargetNetwork()) {
    case "mainnet":
      return "http://seed1.neo.org:20333";
    default:
      return "https://testnet1.neo.coz.io:443";
  }
}

export function isTestnet() {
  return getTargetNetwork() === "testnet";
}

export function isMainnet() {
  return getTargetNetwork() === "mainnet";
}
