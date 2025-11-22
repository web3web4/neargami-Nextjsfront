"use client";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@reown/appkit/networks";

export const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string;


export const wagmiAdapter = new WagmiAdapter({
  networks: [sepolia],
  projectId,
});

export const web3Modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia],
  projectId,
  allWallets: 'HIDE',
  enableWalletConnect: true,
  features: {
    analytics: true,
    swaps: false,
    onramp: false,
    email: false,
    socials: false,
    emailShowWallets: false,
  },
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
  ],
  excludeWalletIds: [
    '9a4cddbdbc19005be790f37cc9176dd24eae51aa2a49fa3edeb3b6a8b089b7be', // Nightly
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369', // Rainbow
  ],
});