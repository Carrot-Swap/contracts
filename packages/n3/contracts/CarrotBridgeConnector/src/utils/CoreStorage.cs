using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework;

namespace Carrot
{
  public class CoreStorage
  {
    private byte[] prefix;

    public CoreStorage(byte[] prefix)
    {
      this.prefix = prefix;
    }

    public StorageMap getStorage(StorageContext rawContext = null)
    {
      var context = rawContext ?? Neo.SmartContract.Framework.Services.Storage.CurrentContext;
      return new(context, prefix);
    }

    public StorageMap getReadOnlyStorage()
    {
      return getStorage(Neo.SmartContract.Framework.Services.Storage.CurrentReadOnlyContext);
    }

    public ByteString get(ByteString key, ByteString defaultValue)
    {
      var value = getReadOnlyStorage().Get(key);
      if (value == null)
      {
        return defaultValue;
      }
      return value;
    }
  }

}