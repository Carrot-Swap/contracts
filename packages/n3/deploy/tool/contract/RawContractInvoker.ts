import {
  NetworkFacade,
  TransactionBuilder,
  signWithAccount,
} from "@cityofzion/neon-api";
import { sc, tx, u, wallet } from "@cityofzion/neon-core";
import { RPCClient } from "@cityofzion/neon-core/lib/rpc";
import { ContractParam } from "@cityofzion/neon-core/lib/sc";
import { getNetworkMagic } from "../../env";
import { sleep } from "../util/sleep";
import { InvokeFunctionFailedError } from "./InvokeFunctionFailedError";

export class RawContractInvoker {
  constructor(
    private readonly rpcClient: RPCClient,
    private readonly address: string,
    private readonly facade: NetworkFacade,
    private readonly siginer: wallet.Account
  ) {}

  invoke = async (operation: string, args?: ContractParam[], fee?: string) => {
    const script = new sc.ScriptBuilder()
      .emitContractCall({
        scriptHash: this.address,
        operation,
        args,
      })
      .build();
    const transaction = new TransactionBuilder()
      .addScript(String(script))
      .addSigners({
        account: this.siginer.scriptHash,
        scopes: tx.WitnessScope.CalledByEntry,
      })
      .addEmptyWitness(this.siginer)
      .build();

    const signingConfig = { signingCallback: signWithAccount(this.siginer) };
    const currentHeight = await this.rpcClient.getBlockCount();
    transaction.validUntilBlock = currentHeight + 100;
    transaction.networkFee = u.BigInteger.fromNumber(fee ?? "10000000");
    transaction.systemFee = u.BigInteger.fromNumber(fee ?? "10000000");
    transaction.sign(this.siginer, getNetworkMagic());
    const signedTx = await this.facade.sign(transaction, signingConfig);
    const txHash = await this.rpcClient.sendRawTransaction(signedTx);
    console.log(txHash);
    const res = await this.waitForConfirmation(txHash);
    return res;
  };

  private waitForConfirmation = async (txHash: string) => {
    while (true) {
      try {
        const transaction = await this.rpcClient.getApplicationLog(txHash);

        if (
          transaction &&
          transaction.executions &&
          transaction.executions.length > 0
        ) {
          const execution = transaction.executions[0];
          if (execution.vmstate === "FAULT") {
            throw new InvokeFunctionFailedError(execution);
          }
          return execution;
        }
      } catch (error) {}
      await sleep(2000);
    }
  };
}
