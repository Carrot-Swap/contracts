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
  public partial class CarrotBridgeConnector
  {
    private static Carrot.CoreStorage storage = new Carrot.CoreStorage(new byte[] { 0x01 });

    [Safe]
    public static UInt160 pauserAddress() => (UInt160)storage.get("pauserAddress", UInt160.Zero);

    [Safe]
    public static UInt160 tssAddress() => (UInt160)storage.get("tssAddress", UInt160.Zero);

    [Safe]
    public static UInt160 tssAddressUpdater() => (UInt160)storage.get("tssAddressUpdater", UInt160.Zero);


    public static void initialize(UInt160 tssAddress_, UInt160 tssAddressUpdater_, UInt160 pauserAddress_)
    {
      Assert(tssAddress_.IsValid, "Invalid address");
      Assert(tssAddressUpdater_.IsValid, "Invalid address");
      Assert(pauserAddress_.IsValid, "Invalid address");

      var map = storage.getStorage();
      map.Put("pauserAddress", pauserAddress_);
      map.Put("tssAddress", tssAddress_);
      map.Put("tssAddressUpdater", tssAddressUpdater_);
    }



    /**
     * @dev Modifier to restrict actions to pauser address.
     */
    private static bool isPauser()
    {
      return Runtime.CheckWitness(pauserAddress());
    }

    /**
     * @dev Modifier to restrict actions to TSS address.
     */
    private static bool isTss()
    {
      return Runtime.CheckWitness(tssAddress());
    }

    /**
     * @dev Modifier to restrict actions to TSS updater address.
     */
    private static bool isTssUpdater()
    {
      return Runtime.CheckWitness(tssAddressUpdater());
    }


    /**
     * @dev Update the pauser address. The only address allowed to do that is the current pauser.
     */
    public static void updatePauserAddress(UInt160 pauserAddress_)
    {
      Assert(isPauser(), "Permission denined");
      Assert(pauserAddress_.IsValid, "Invalid address");

      var prev = pauserAddress();
      storage.getStorage().Put("tssAddressUpdater", pauserAddress_);
      OnTSSAddressUpdaterUpdated(prev, pauserAddress_);
    }

    /**
     * @dev Update the TSS address. The address can be updated by the TSS updater or the TSS address itself.
     */
    public static void updateTssAddress(UInt160 tssAddress_)
    {
      Assert(isTssUpdater() || isTss(), "Permission denined");
      Assert(tssAddress_.IsValid, "Invalid address");

      var prev = tssAddress();
      storage.getStorage().Put("tssAddress", tssAddress_);
      OnTSSAddressUpdated(prev, tssAddress_);
    }

    /**
     * @dev Changes the ownership of tssAddressUpdater to be the one held by the CarrotBridge TSS Signer nodes.
     */
    public static void renounceTssAddressUpdater(UInt160 newTssAddressUpdater_)
    {
      Assert(isTssUpdater(), "Permission denined");
      Assert(newTssAddressUpdater_.IsValid, "Invalid address");

      var prev = tssAddressUpdater();
      storage.getStorage().Put("tssAddressUpdater", newTssAddressUpdater_);
      OnTSSAddressUpdaterUpdated(prev, newTssAddressUpdater_);
    }



    [Safe]
    public static bool isPaused() => (bool)StdLib.Deserialize(storage.get("isPaused", StdLib.Serialize(false)));

    /**
     * @dev Pause the input (send) transactions.
     */
    public static void pause()
    {
      Assert(isPauser(), "Permission denined");
      storage.getStorage().Put("isPaused", StdLib.Serialize(true));
    }

    /**
     * @dev Unpause the contract to allow transactions again.
     */
    public static void unpause()
    {
      Assert(isPauser(), "Permission denined");
      storage.getStorage().Put("isPaused", StdLib.Serialize(false));
    }


  }
}