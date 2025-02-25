'use client';

import { Lucid } from 'lucid-cardano';

// Function to connect the wallet
export async function connectWallet() {
  try {
    // Ensure this runs only on the client-side
    if (typeof window === 'undefined' || !window.cardano) {
      alert('❌ No Cardano wallets detected. Please install Nami, Eternl, or Flint.');
      return null;
    }

    // Get available wallets
    const availableWallets = Object.keys(window.cardano).filter((wallet) =>
      ['nami', 'eternl', 'flint'].includes(wallet)
    );

    if (availableWallets.length === 0) {
      alert('❌ No compatible Cardano wallets found!');
      return null;
    }

    // Select the first available wallet
    const selectedWallet = availableWallets[0];

    // Enable the selected wallet
    const api = await window.cardano[selectedWallet]?.enable();
    if (!api) {
      alert(`❌ Failed to connect to ${selectedWallet}.`);
      return null;
    }

    // Initialize Lucid
    const lucid = await Lucid.new(undefined, 'Mainnet'); // Change to 'Testnet' if needed
    lucid.selectWallet(api);

    // Fetch wallet address
    const address = await lucid.wallet.address();
    console.log('✅ Connected Wallet:', address);

    return address; // Return wallet address to update the UI
  } catch (error) {
    console.error('❌ Wallet connection failed:', error);
    alert('⚠️ Error connecting to wallet. Please try again.');
    return null;
  }
}
