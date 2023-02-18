import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { argentWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";

const isProduction = process.env.NODE_ENV === "production";

const calypsoChain = {
  name: "SKALE | Calypso NFT Hub",
  network: "SKALE",
  testnet: !isProduction,
  nativeCurrency: {
    decimals: 18,
    symbol: "sFUEL",
    name: "sFUEL",
  },
  id: parseInt(isProduction ? "0x5d456c62" : "0x1482a7b2"),
  rpcUrls: {
    default: {
      http: [
        isProduction
          ? "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"
          : "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
      ],
    },
  },
};

const europaChain = {
  name: "SKALE | Europa Liquidity Hub",
  network: "SKALE",
  testnet: !isProduction,
  nativeCurrency: {
    decimals: 18,
    symbol: "sFUEL",
    name: "sFUEL",
  },
  id: parseInt(isProduction ? "0x79f99296" : "0x1c6199cc"),
  rpcUrls: {
    default: {
      http: [
        isProduction
          ? "https://mainnet.skalenodes.com/v1/elated-tan-skat"
          : "https://staging-v3.skalenodes.com/v1/staging-legal-crazy-castor",
      ],
    },
  },
};

const ethereum = {
  name: "Ethereum",
  network: "Ethereum Mainnet",
  testnet: !isProduction,
  nativeCurrency: {
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
  },
  id: isProduction ? 1 : 5,
  rpcUrls: {
    default: {
      http: [
        isProduction
          ? "https://eth.llamarpc.com"
          : "https://goerli.blockpi.network/v1/rpc/public",
      ],
    },
  },
};

const { chains, provider, webSocketProvider } = configureChains(
  [ethereum, calypsoChain, europaChain],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "NFT Sale",
  chains,
});

const demoAppInfo = {
  appName: "NFT Sale",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [argentWallet({ chains }), trustWallet({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
