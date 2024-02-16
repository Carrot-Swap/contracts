export const CHAIN_ID_BY_NAME: Record<string, number> = {
  neo_n3_testnet: 894710606,
  neo_testnet: 2970385,
  polygon_mumbai: 80001,
  bnb_testnet: 97,
  eth_goril: 5,
  eth_sepolia: 11155111,
};

export const CONNECTOR_ADDRESSES: Record<string, string> = {
  neo_n3_testnet: "0x1ecde43d0f1665f21c374a59078a1d882851329e",
  neo_testnet: "0xfef2e1ebcde3563F377f5B8f3B96eA85Dcd45540",
  polygon_mumbai: "0x9d0178586025Df843FD8a18B5c1DC8e44BC6d01a",
  bnb_testnet: "0x00eFC3F71C0EC21ef72Eef05022A22A5Da05AA88",
  eth_goril: "0x00eFC3F71C0EC21ef72Eef05022A22A5Da05AA88",
  eth_sepolia: "0x0149392a9EEE985F2B82B8a64213BB10159863F8",
};

export const TOKEN_ADDRESSES: Record<string, Record<string, string>> = {
  neo_testnet: {
    80001: "0x1635841793eFf93c836E141e0aAf2130925D4849",
    999999: "0xe0114Bec0350947FB148007aDB8A42689b924143",
    894710606: "0xc4E8419afEfb35C057eAC4F1B721e28b9baAEc3c",
    97: "0x8c7B63db427d141046e788634Ca6625FD2a45578",
    5: "0xbB2cF54C82a6d4137cD88eAF8ad1805D77b3D060",
  },
  polygon_mumbai: {},
  eth_goril: {},
  bnb_testnet: {},
  eth_sepolia: {
    80001: "0x1F251BA9E613143933d4251bc0520C3AB3b2a480",
    // 999999: "0xe0114Bec0350947FB148007aDB8A42689b924143",
    894710606: "0x10bB478E563936D43d83F09eE59C4B9bdaD04B71",
    97: "0x4803c6968397A39d975a58450161bBf42D9C15d0",
    // 5: "0xbB2cF54C82a6d4137cD88eAF8ad1805D77b3D060",
  },
};

export const BRIDGE_ADDRESSES: Record<string, string> = {
  neo_n3_testnet: "0x92aedf18d7d4959e8ac6d19dd0924e6280b60a18",
  neo_testnet: "0xF056e7cfD3A451695FbB2E2D095bd649244Fe759",
  polygon_mumbai: "0x7e753a9f5585e67149d452F94309f490c3853A89",
  bnb_testnet: "0x80CF3A59be173276bcA433298449A12f22670347",
  eth_goril: "0x80CF3A59be173276bcA433298449A12f22670347",
};
