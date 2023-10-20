

namespace Carrot.Bridge
{
  public abstract class CarrotReceiver
  {
    public static void OnCarrotMessage(string url, byte[] userData, int code, byte[] result)
    {
      if (Runtime.CallingScriptHash != Oracle.Hash) throw new Exception("Unauthorized!");
      Storage.Put(Storage.CurrentContext, PreData, result.ToByteString());
    }

    public static void OnCarrotRevert(string url, byte[] userData, int code, byte[] result)
    {
      if (Runtime.CallingScriptHash != Oracle.Hash) throw new Exception("Unauthorized!");
      Storage.Put(Storage.CurrentContext, PreData, result.ToByteString());
    }

  }
}