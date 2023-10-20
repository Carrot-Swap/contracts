import NeonCore, { rpc } from "@cityofzion/neon-core";

export class InvokeFunctionFailedError extends Error {
  constructor(
    public readonly res:
      | NeonCore.rpc.InvokeResult
      | rpc.ApplicationLogJson["executions"][0]
  ) {
    super();
  }
}
