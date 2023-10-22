using System.ComponentModel;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;
using Neo;
using System;
using System.Numerics;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Attributes;
using Carrot;

namespace Carrot.Bridge.Core
{
  public partial class CarrotBridgeConnector
  {

    [DisplayName("BridgeMessageSent")]
    public static event Action<UInt160, UInt160, BigInteger, UInt160, BigInteger, byte[], byte[]> OnBridgeMessageSent;

    [DisplayName("BridgeMessageReceived")]
    public static event Action<UInt160, BigInteger, UInt160, byte[], byte[]> OnBridgeMessageReceived;

    [DisplayName("BridgeMessageReverted")]
    public static event Action<UInt160, BigInteger, BigInteger, UInt160, byte[], byte[]> OnBridgeMessageReverted;

    [DisplayName("TSSAddressUpdated")]
    public static event Action<UInt160, UInt160> OnTSSAddressUpdated;

    [DisplayName("TSSAddressUpdaterUpdated")]
    public static event Action<UInt160, UInt160> OnTSSAddressUpdaterUpdated;

    [DisplayName("PauserAddressUpdated")]
    public static event Action<UInt160, UInt160> OnPauserAddressUpdated;
  }
}