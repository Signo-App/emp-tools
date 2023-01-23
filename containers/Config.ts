// Onboard.js requires API keys for some providers. These keys provided below
// Enable the dapp to work out of the box without any custom configs.
// You can choose to specify these env variables if you wish to get analytics
// over user interactions. Otherwise, defaults are used.
import { ethers } from "ethers";
type Network = ethers.providers.Network;
export const config = (network: Network | null) => {
  return {
    onboardConfig: {
      apiKey:
        process.env.NEXT_PUBLIC_ONBOARD_API_KEY ||
        "12153f55-f29e-4f11-aa07-90f10da5d778",
      onboardWalletSelect: {
        wallets: [{ walletName: "metamask", preferred: true }],
      },
      walletCheck: [
        { checkName: "connect" },
        { checkName: "accounts" },
        { checkName: "network" },
        { checkName: "balance", minimumBalance: "0" },
      ],
    },
  };
};
