import { NetworkFacade } from "@cityofzion/neon-api";
import { getDeployer, getRPCClient, getRPCUrl } from "../../env";
import { RawContractReader } from "./RawContractReader";
import { RawContractInvoker } from "./RawContractInvoker";

export class RawContract {
  static async create(address: string) {
    const rpcClient = getRPCClient();
    const facade = await NetworkFacade.fromConfig({ node: getRPCUrl() });
    const invoker = new RawContractInvoker(
      rpcClient,
      address,
      facade,
      getDeployer()
    );
    const reader = new RawContractReader(rpcClient, address, getDeployer());
    return {
      ...invoker,
      ...reader,
    };
  }
}
