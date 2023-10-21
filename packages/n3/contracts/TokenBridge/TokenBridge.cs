using System.ComponentModel;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;
using Neo;
using System.Numerics;
using Carrot.ABI;
using Carrot.Bridge.Base;

namespace Carrot.TokenBridge
{
  [DisplayName("TokenBridge")]
  [ManifestExtra("Author", "Carrot Swap")]
  [ManifestExtra("Description", "Carrot Swap Bridge contract")]
  [SupportedStandards("NEP17", "NEP10")]
  [ContractPermission("*", "*")]
  public partial class TokenBridge : CarrotBridgeInteractor
  {
    private static CoreStorage storage = new CoreStorage(new byte[] { 0x01 });

    public static void send(UInt160 user, BigInteger destinationChainId, UInt160 destinationAddress, BigInteger tokenId, BigInteger amount)
    {
      var message = new ABIBuilder()
            .add(user)
            .add(destinationChainId)
            .add(destinationAddress)
            .add(tokenId)
            .add(amount)
            .build();

      sendBridgeMessage(
        Runtime.EntryScriptHash,
        Runtime.ExecutingScriptHash,
        destinationChainId,
        destinationAddress,
        0,
        message,
        null);
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