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
using Carrot.Bridge.Base;
using static Neo.SmartContract.Framework.ExecutionEngine;

namespace Carrot.TokenBridge
{
  [DisplayName("TokenBridge")]
  [ManifestExtra("Author", "Carrot Swap")]
  [ManifestExtra("Description", "Carrot Swap Bridge contract")]
  [SupportedStandards("NEP17", "NEP10")]
  [ContractPermission("*", "*")]
  public partial class TokenBridge : CarrotBridgeInteractor
  {
    private static Carrot.CoreStorage storage = new Carrot.CoreStorage(new byte[] { 0x01 });

    public static void send(UInt256 destinationChainId, byte[] destinationAddress, UInt256 tokenId, UInt256 amount)
    {
      var message = new TokenBridgeMessage(tokenId, amount);
      sendBridgeMessage(
        Runtime.EntryScriptHash,
        Runtime.ExecutingScriptHash,
        destinationChainId,
        destinationAddress,
        UInt256.Zero,
        (byte[])StdLib.Serialize(message),
        null);
    }

    /**
     * @dev onBridgeMessage is called when a cross-chain message reaches a contract
     */
    public static void onBridgeMessage(
        byte[] txSenderAddress,
        UInt256 sourceChainId,
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
        UInt256 sourceChainId,
        byte[] destinationAddress,
        UInt256 destinationChainId,
        byte[] message)
    {

    }

    struct TokenBridgeMessage
    {
      public TokenBridgeMessage(UInt256 id, UInt256 amount)
      {
        id = id;
        amount = amount;
      }

      public UInt256 id;
      public UInt256 amount;
    }

  }
}