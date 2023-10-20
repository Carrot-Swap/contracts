using System.ComponentModel;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;
using Neo;
using System;
using System.Numerics;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Attributes;
using Neo.SmartContract.Framework.Native;
using Carrot;
using static Neo.SmartContract.Framework.ExecutionEngine;

namespace Carrot.Bridge
{
  public abstract partial class CarrotBridgeInteractor : SmartContract
  {

    private static Carrot.CoreStorage storage = new Carrot.CoreStorage(new byte[] { 0x01 });
    private static Carrot.CoreStorage interactorsByChainIdStorage = new Carrot.CoreStorage(new byte[] { 0x02 });

    public static void initilize(UInt160 owner, UInt160 connectorAddress, UInt256 currentChainId)
    {
      Assert(getOwner() == UInt160.Zero, "Already Initilized");

      var map = storage.getStorage();
      map.Put("connectorAddress", connectorAddress);
      map.Put("currentChainId", currentChainId);
      map.Put("owner", owner);
    }

    private static void isValidMessageCall(byte[] txSenderAddress, byte[] sourceChainId)
    {
      isValidCaller();
      Assert(((UInt160)txSenderAddress) == (UInt160)interactorsByChainIdStorage.get((UInt256)sourceChainId, UInt160.Zero), "Invalid interactor");
    }

    private static void isValidRevertCall(byte[] txSenderAddress, byte[] sourceChainId)
    {
      isValidCaller();
      Assert((UInt160)txSenderAddress == Runtime.ExecutingScriptHash, "Invalid Bridge Revert Call");
      Assert((UInt256)sourceChainId == currentChainId(), "Invalid Bridge Revert Call");
    }

    [Safe]
    private static UInt160 connectorAddress() => (UInt160)storage.get("connectorAddress", UInt160.Zero);

    [Safe]
    private static UInt256 currentChainId() => (UInt256)storage.get("currentChainId", UInt256.Zero);

    private static void isValidCaller()
    {
      Assert(Runtime.CheckWitness(connectorAddress()), "Invalid Caller");
    }

    /**
     * @dev Useful for contracts that inherit from this one
     */
    private static void isValidChainId(UInt256 chainId)
    {
      Assert(((UInt160)interactorsByChainIdStorage.get(chainId, UInt160.Zero)) == UInt160.Zero, "Invalid chain id");
    }

    private static void setInteractorByChainId(UInt256 destinationChainId, byte[] contractAddress)
    {
      Assert(isOwner(), "Permission Denied");
      interactorsByChainIdStorage.getStorage().Put(destinationChainId, (UInt160)contractAddress);
    }

    protected static void sendBridgeMessage(
        UInt160 txOriginAddress,
        UInt160 txSenderAddress,
        UInt256 destinationChainId,
        byte[] destinationAddress,
        UInt256 destinationGasLimit,
        byte[] message,
        byte[] bridgeParams)
    {
      Contract.Call(connectorAddress(), "send", CallFlags.All, new object { txOriginAddress, txSenderAddress, destinationChainId, destinationAddress, destinationGasLimit, message, bridgeParams });
    }


  }
}