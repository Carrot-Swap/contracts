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

namespace Carrot.ABI
{

  public class ABIBuilder
  {
    private byte[] data = new byte[0];

    public ABIBuilder add(System.Numerics.BigInteger value)
    {
      data = data.Concat(Util.BigInteger.encode(value));
      return this;
    }

    public byte[] build()
    {
      return data;
    }
  }

  namespace Util
  {
    class Common
    {
      public static byte[] getPart(byte[] data, int idx)
      {
        byte[] part = new byte[32];
        var baseIdx = idx * 32;
        for (var i = 0; i < 32; i++)
        {
          part[i] = data[baseIdx + i];
        }
        return part;
      }
    }

    class BigInteger
    {
      public static byte[] encode(System.Numerics.BigInteger amount)
      {
        var data = amount.ToByteArray();
        var placeholder = new byte[32 - data.Length];

        return data.Concat(placeholder);
      }

      public static System.Numerics.BigInteger decode(byte[] data, int idx)
      {
        return new System.Numerics.BigInteger(Common.getPart(data, idx));
      }
    }
  }
}