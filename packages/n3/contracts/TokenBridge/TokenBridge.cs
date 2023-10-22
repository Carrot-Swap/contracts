using System.ComponentModel;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;
using Neo;
using System.Numerics;
using Carrot.ABI;
using Carrot.Bridge.Base;
using static Neo.SmartContract.Framework.ExecutionEngine;
using Neo.SmartContract.Framework.Native;

namespace Carrot.TokenBridge
{
  [DisplayName("TokenBridge")]
  [ManifestExtra("Author", "Carrot Swap")]
  [ManifestExtra("Description", "Carrot Swap Bridge contract")]
  [SupportedStandards("NEP17", "NEP10")]
  [ContractPermission("*", "*")]
  public partial class TokenBridge : CarrotBridgeInteractor
  {
    private static CoreStorage configStorage = new CoreStorage(new byte[] { 0x01 });
    private static CoreStorage whitelistStorage = new CoreStorage(new byte[] { 0x02 });
    private static CoreStorage amountStorage = new CoreStorage(new byte[] { 0x03 });

    [Safe]
    public static UInt160 evmInteractorAddress() => (UInt160)configStorage.get("evmInteractorAddress", UInt160.Zero);

    [Safe]
    public static BigInteger getTokenId(UInt160 address) => (BigInteger)whitelistStorage.getReadOnlyStorage().Get(address);

    public static void putTokenId(UInt160 address, BigInteger id)
    {
      Assert(isOwner(), "Permission Denied");
      whitelistStorage.getStorage().Put(address, id);
    }

    public static void setEVMInteractorAddress(UInt160 address)
    {
      Assert(isOwner(), "Permission Denied");
      configStorage.getStorage().Put("evmInteractorAddress", address);
    }

    public static void OnNEP17Payment(UInt160 from, BigInteger amount, object data)
    {
      Assert(evmInteractorAddress() != UInt160.Zero, "EVM interactor address is zero");
      if (getTokenId(Runtime.CallingScriptHash) > 0)
      {
        var total = (BigInteger)amountStorage.getReadOnlyStorage().Get(from);
        amountStorage.getStorage().Put(from, total + amount);
      }
    }

    public static void send(UInt160 sender, UInt160 to)
    {
      Assert(Runtime.CheckWitness(sender), "Invalid request");
      var total = (BigInteger)amountStorage.getReadOnlyStorage().Get(sender);
      amountStorage.getStorage().Put(sender, (BigInteger)0);

      var message = new ABIBuilder()
            .add(894710606)
            .add(to)
            .add(total * BigInteger.Pow(10, 18))
            .build();

      sendBridgeMessage(
        Runtime.EntryScriptHash,
        Runtime.ExecutingScriptHash,
        894710606,
        evmInteractorAddress(),
        0,
        message,
        null);
    }

    public static void withdraw(UInt160 address, UInt160 to, BigInteger amount)
    {
      Assert(isOwner(), "Permission Denied");
      Contract.Call(address, "transfer", CallFlags.All, new object[] { Runtime.ExecutingScriptHash, to, amount, null });
    }

    /**
     * @dev onBridgeMessage is called when a cross-chain message reaches a contract
     */
    public static void onBridgeMessage(
        byte[] txSenderAddress,
        BigInteger sourceChainId,
        UInt160 destinationAddress,
        byte[] message)
    {

    }

    /**
     * @dev onBridgeRevert is called when a cross-chain message reverts.
     * It's useful to rollback to the original state
     */
    public static void onBridgeRevert(
        UInt160 txSenderAddress,
        BigInteger sourceChainId,
        UInt160 destinationAddress,
        BigInteger destinationChainId,
        byte[] message)
    {

    }

  }
}