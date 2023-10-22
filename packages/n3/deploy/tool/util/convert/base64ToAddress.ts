import { u, wallet } from "@cityofzion/neon-core";

export function base64ToAddress(base64String: string) {
  const scriptHash = base64ToScriptHash(base64String);
  const address = wallet.getAddressFromScriptHash(scriptHash);
  return address;
}

export function base64ToScriptHash(base64String: string) {
  const scriptHash = u.reverseHex(u.base642hex(base64String));
  return scriptHash;
}
