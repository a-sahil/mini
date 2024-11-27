import React, { useState } from 'react';
import { Wallet, LogIn, Loader } from 'lucide-react';

declare global {
  interface Window {
    keplr?: any; // You may need to refine the type based on the Keplr extension API.
  }
}

const KeplerSignIn: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectKeplerWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      // Check if Kepler is installed
      if (!window.keplr) {
        throw new Error('Please install Keplr extension first.');
      }

      // Request connection to Keplr
      await window.keplr.enable('cosmoshub-4'); // Replace with your specific chain-id if needed

      // Get the offline signer
      const offlineSigner = window.keplr.getOfflineSigner('cosmoshub-4');

      // Get user's Keplr accounts
      const accounts = await offlineSigner.getAccounts();

      if (accounts && accounts[0]) {
        setWalletAddress(accounts[0].address);
      }
    } catch (error: any) {
      console.error('Error connecting to Keplr:', error);
      setError(error.message || 'Failed to connect to Keplr wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Wallet Status */}
          {walletAddress && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Wallet Connected</p>
              <p className="text-xs text-green-600 mt-1 break-all">
                {walletAddress}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Connect Button */}
          <button
            onClick={connectKeplerWallet}
            disabled={isConnecting || !!walletAddress}
            className={`w-full flex justify-center items-center gap-2 px-4 py-3 border border-transparent text-sm font-medium rounded-xl
              ${walletAddress 
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              } transition-colors duration-200`}
          >
            {isConnecting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : walletAddress ? (
              <>
                <Wallet className="w-5 h-5" />
                Connected to Keplr
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Connect Keplr Wallet
              </>
            )}
          </button>
        </div>     
      </div>
    </div>
  );
};

export default KeplerSignIn;
