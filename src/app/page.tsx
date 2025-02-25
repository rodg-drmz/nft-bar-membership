'use client';

import { useState } from 'react';
import { connectWallet } from './utils/walletConnector';

export default function HomePage() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  async function handleWalletConnect() {
    setIsConnecting(true);
    const walletAddress = await connectWallet();
    if (walletAddress) {
      setWallet(walletAddress);
    } else {
      alert('❌ Failed to connect wallet. Please try again.');
    }
    setIsConnecting(false);
  }

  async function handleDisconnect() {
    setWallet(null); // Reset wallet state
    alert('🔌 Wallet disconnected.');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] text-white p-6">
      {/* Hero Section */}
      <header className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-[#E76F00] leading-tight">
          🍺 Welcome to the Hopnonymous Mug Club 🍺
        </h1>
        <p className="text-[#F5F5F5] mt-4 text-lg">
          An exclusive membership experience for craft beer lovers! 🍻
        </p>

        {/* Connect Wallet Button */}
        {!wallet ? (
          <button
            className={`mt-6 px-8 py-3 text-[#1A1A1A] text-lg font-semibold rounded-lg transition shadow-lg ${
              isConnecting
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-[#E76F00] hover:bg-[#FF8C42]'
            }`}
            onClick={handleWalletConnect}
            disabled={isConnecting}
          >
            {isConnecting ? '🔄 Connecting...' : '🔗 Connect Wallet'}
          </button>
        ) : (
          <button
            className="mt-6 px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition shadow-lg"
            onClick={handleDisconnect}
          >
            ❌ Disconnect Wallet
          </button>
        )}

        {/* Show Wallet Address If Connected */}
        {wallet && (
          <div className="mt-4 text-[#F5F5F5] bg-[#8C6239] p-3 rounded-lg shadow-md">
            <p>✅ Connected Wallet:</p>
            <p className="break-words text-sm">{wallet}</p>
          </div>
        )}
      </header>

      {/* Three Feature Boxes */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Box 1 */}
        <div className="bg-[#8C6239] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#F5F5F5]">🍺 Exclusive Brews</h2>
          <p className="text-gray-300 mt-2">
            Get access to members-only craft beer selections.
          </p>
        </div>

        {/* Box 2 */}
        <div className="bg-[#E76F00] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">🎉 VIP Events</h2>
          <p className="text-[#1A1A1A] mt-2">
            Join special brewery events and tasting sessions.
          </p>
        </div>

        {/* Box 3 */}
        <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">🎁 Rewards & Discounts</h2>
          <p className="text-[#1A1A1A] mt-2">
            Earn points and redeem exclusive Hopnonymous merch!
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <p className="text-xl font-semibold text-[#F5F5F5]">
          🍺 Join the Mug Club and unlock premium perks! 🍺
        </p>
        <p className="text-md text-gray-400 mt-2">
          Sign up today and become part of the Hopnonymous family.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-[#F5F5F5] text-sm">
        🍺 Brewed on the Cardano Blockchain | DRMZ Web3 Labs 🍺
      </footer>
    </div>
  );
}
