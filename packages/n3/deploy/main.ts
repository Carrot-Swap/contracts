import { testnet } from "./scripts/testnet/testnet";

export async function main() {
  try {
    await testnet();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

main();
