export function bigEndianToLittleEndian(hex: string) {
  return (hex.match(/.{64}/g) || [])
    .map((part) => (part.match(/.{1,2}/g) ?? []).reverse().join(""))
    .join("");
}

export function littleEndianToBigEndian(hex: string) {
  return (hex.match(/.{64}/g) || [])
    .map((part) => {
      const byteArray = (part.match(/../g) ?? []).map((item) =>
        parseInt(item, 16)
      );
      const bigEndianByteArray = byteArray.reverse();

      const bigEndianHex = bigEndianByteArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      return bigEndianHex;
    })
    .join("");
}
