import NeonCore, { u, wallet } from "@cityofzion/neon-core";
import { RPCClient } from "@cityofzion/neon-core/lib/rpc";
import { base64ToAddress, base64ToScriptHash } from "../util/convert";
import { InvokeFunctionFailedError } from "./InvokeFunctionFailedError";

export class RawContractReader {
  constructor(
    private readonly rpcClient: RPCClient,
    private readonly address: string,
    private readonly siginer?: wallet.Account
  ) {}

  call = async <T>(operation: string, args?: unknown[]) => {
    const res = await this.rpcClient.invokeFunction(
      this.address,
      operation,
      args,
      this.siginer
        ? [
            {
              account: this.siginer.scriptHash,
              scopes: "Global",
            },
          ]
        : []
    );
    if (res.state !== "HALT") {
      console.error(res);
      throw new InvokeFunctionFailedError(res);
    }
    return this.makeResult<T>(res);
  };

  readNumber = async (operation: string, args?: unknown[]) => {
    const value = await this.call<string>(operation, args);
    return Number(value.getValue());
  };

  readScriptHash = async (operation: string, args?: unknown[]) => {
    const value = await this.call<string>(operation, args);
    return value.getScriptHash();
  };

  readAddress = async (operation: string, args?: unknown[]) => {
    const value = await this.call<string>(operation, args);
    return value.getAddress();
  };

  readString = async (operation: string, args?: unknown[]) => {
    const value = await this.call<string>(operation, args);
    return value.getString();
  };

  getContractState = async () => {
    const state = await this.rpcClient.getContractState(this.address);
    return state;
  };

  private makeResult = <T>(
    data: NeonCore.rpc.InvokeResult<NeonCore.sc.StackItemJson>
  ) => {
    const getValue = <V = T>() => data.stack[0].value as V;
    const getString = () =>
      u.HexString.fromBase64(getValue<string>()).toAscii();
    const getAddress = () => base64ToAddress(getValue<string>());
    const getScriptHash = () => base64ToScriptHash(getValue<string>());
    return {
      ...data,
      getValue,
      getAddress,
      getString,
      getScriptHash,
    };
  };
}
