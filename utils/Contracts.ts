import assert from "assert";
// Export contracts in the form [address, type, version]
// See getAbi file for full list of versions and types available
export type ContractArguments = [string, string, string];
export const Contracts: { [networkId: number]: ContractArguments[] } = {
  1: [
    ["0x012f25771eD17874995d4444508aD52750cF0e15", "EMP", "1"], // DEXTF Yield Dollar
  ].reverse() as ContractArguments[],
  42: [
    ["0xB8Fff2d31A4Dd44E30dB461289d3e0b48Fd6976f", "EMP", "2"], // DEXTF Yield Dollar
    ["0x3366b8549047C66E985EcC43026ceD3E831e46A9", "EMP", "1"], // uUSDrBTC Kovan Sep20
    ["0xFb70A4CBD537B36e647553C279a93E969b041DF0", "EMP", "1"], // yUSDETH Kovan oct 2030
    ["0x24d15f2607ee56dF752375a63e646cbF8E652aF3", "Perpetual", "2"], //"Perpetual", Test Contract
    ["0xA000Dfe84A1852865d5231e0F6CBF0De08888abE", "EMP", "1"], // uUSDrBTC Kovan Oct20
    ["0x10E3866b5F52d847F24aaAA14BcAd22b74CC14e2", "EMP", "1"], // uUSDrBTC Kovan Nov20
    ["0x3d7d563F4679C750e462Eae4271d2bd84dF66060", "EMP", "1"], // uUSDrETH Kovan Nov20
    ["0x95b597b6fa71f9f42a93b83149b4d835a6176596", "EMP", "2"], // uUSDrETHname Kovan
  ],
  5: [
    ["0x012f25771eD17874995d4444508aD52750cF0e15", "EMP", "2"], // DEXTF Yield Dollar
  ],
};

export const getByAddress = (address: string, network: number) => {
  assert(Contracts[network], "Invalid Network: " + network);
  const found = Contracts[network].find((info: ContractArguments) => {
    return info[0].toLowerCase() === address.toLowerCase();
  });
  assert(
    found,
    `No contract found by network ${network} and address ${address}`
  );
  return found;
};
