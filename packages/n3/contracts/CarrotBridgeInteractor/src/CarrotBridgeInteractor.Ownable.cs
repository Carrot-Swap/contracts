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

namespace Carrot.Bridge.Base
{
  public abstract partial class CarrotBridgeInteractor
  {

    [Safe]
    public static UInt160 getOwner() => (UInt160)storage().get("owner", UInt160.Zero);

    [Safe]
    public static bool isOwner() => Runtime.CheckWitness(getOwner());

    public static void updateOwner(UInt160 address)
    {
      var owner = getOwner();
      Assert(owner == UInt160.Zero || isOwner(), "Permission Denied");
      Assert(address.IsValid, "Invalid Address");

      storage().getStorage().Put("owner", address);
    }

  }
}