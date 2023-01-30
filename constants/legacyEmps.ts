// List of EMP's from legacy contracts that do not support the following features
// - Transaction CR < GCR if resulting position CR > GCR
// - Redemption and cancel withdrawal request post-expiry
export const legacyEMPs: { [networkId: number]: string[] } = {
  1: [
    "0x3f2D9eDd9702909Cf1F8C4237B7c4c5931F9C944", // ETHBTC
    "0x67DD35EaD67FcD184C8Ff6D0251DF4241F309ce1", // yCOMP
    "0xb56C5f1fB93b1Fbd7c473926c87B6B9c4d0e21d5", // yUSD-SEP20
    "0xE1Ee8D4C5dBA1c221840c08f6Cf42154435B9D52", // yUSD-OCT20
    "0xc0b19570370478EDE5F2e922c5D31FAf1D5f90EA", // uUSDrBTC-OCT
  ],
  42: [
    "0xFb70A4CBD537B36e647553C279a93E969b041DF0", //"Perpetual", yUSD Kovan Oct30
    "0xA000Dfe84A1852865d5231e0F6CBF0De08888abE", // uUSDrBTC Kovan Oct20
  ],
  5: [
    "0xe478461458A6846279005c9416256E230376069f",
    "0xeb5c6dD4Ba0Bc93cbf9A5fDf8d6B1153a238f1CD", //"Perpetual", yUSD Kovan Oct30
    "0x60d6c8E5Ca5D4A2aa1D0D4a4c72944A066008F75",
    "0x7D1d0ad876168B0654391b8ADB17D1D157a29C41",
    "0xC694Ce83BCf3f7f220BC9B62354CEC6A94446eBD",
    "0x15Ff9a9831146642d55079deF442f7D304Ffa027",
  ],
};
