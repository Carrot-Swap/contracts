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
  [DisplayName("CarrotBridgeConnector")]
  [ManifestExtra("Author", "Carrot Swap")]
  [ManifestExtra("Description", "Carrot Swap Bridge contract")]
  [SupportedStandards("NEP17", "NEP10")]
  [ContractPermission("*", "*")]
  public partial class CarrotBridgeConnector : SmartContract
  {

    /**
     * @dev Entrypoint to send data through CarrotBridge
     * This call locks the token on the contract and emits an event with all the data needed by the protocol.
     */
    public static void send(
        UInt160 txOriginAddress,
        UInt160 txSenderAddress,
        UInt256 destinationChainId,
        byte[] destinationAddress,
        UInt256 destinationGasLimit,
        byte[] message,
        byte[] bridgeParams)
    {
      Assert(isPaused(), "Paused");

      OnBridgeMessageSent(
          txOriginAddress,
          txSenderAddress,
          destinationChainId,
          destinationAddress,
          destinationGasLimit,
          message,
          bridgeParams

      );
    }

    /**
     * @dev Handler to receive data from other chain.
     * This method can be called only by TSS.
     */
    public static void onReceive(
        byte[] txSenderAddress,
        UInt256 sourceChainId,
        UInt160 destinationAddress,
        byte[] message,
        byte[] internalSendHash
    )
    {
      Assert(isTss(), "Permission denied");
      if (message.Length > 0)
      {
        Contract.Call(
          destinationAddress,
          "onBridgeMessage",
          CallFlags.All,
          new object[] { txSenderAddress, sourceChainId, destinationAddress, message });
      }

      OnBridgeMessageReceived(
          txSenderAddress,
          sourceChainId,
          destinationAddress,
          message,
          internalSendHash
      );
    }

    /**
     * @dev Handler to receive errors from other chain.
     * This method can be called only by TSS.
     */
    public static void onRevert(
        UInt160 txSenderAddress,
        UInt256 sourceChainId,
        byte[] destinationAddress,
        UInt256 destinationChainId,
        byte[] message,
        byte[] internalSendHash
    )
    {
      Assert(isPaused(), "Paused");
      Assert(isTss(), "Permission denied");
      if (message.Length > 0)
      {
        Contract.Call(txSenderAddress, "onBridgeRevert", CallFlags.All, new object[] {
                txSenderAddress,
                sourceChainId,
                destinationAddress,
                destinationChainId,
                message});
      }

      OnBridgeMessageReverted(
                txSenderAddress,
                sourceChainId,
                destinationChainId,
                destinationAddress,
                message,
                internalSendHash

            );
    }

  }
}