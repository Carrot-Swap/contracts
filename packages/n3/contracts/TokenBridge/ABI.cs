using System;
using Neo.SmartContract.Framework;

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

    public ABIBuilder add(Neo.UInt160 value)
    {
      data = data.Concat(Util.UInt160.encode(value));
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

      private static byte[] Reverse(byte[] data)
      {
        var placeholder = new byte[32];
        for (int i = 0; i < data.Length; i++)
        {
          placeholder[placeholder.Length - 1 - i] = data[i];
        }
        return placeholder;
      }
    }

    class UInt160
    {
      public static byte[] encode(Neo.UInt160 value)
      {
        var data = (byte[])value;
        var placeholder = new byte[32 - data.Length];
        return data.Concat(placeholder);
      }

      public static Neo.UInt160 decode(byte[] data, int idx)
      {
        return (Neo.UInt160)Common.getPart(data, idx);
      }
    }
  }
}