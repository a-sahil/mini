'use client'
import React, { useState } from 'react';
import { MessageSquare, Wallet, LogIn, Loader } from 'lucide-react';
import MemeChatPage from './components/MemeChatPage';

declare global {
  interface Window {
    keplr?: any;
  }
}

const SignInPage: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const connectKeplerWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      // Check if Keplr is installed
      if (!window.keplr) {
        throw new Error('Please install Keplr extension first.');
      }

      // Request connection to Keplr
      await window.keplr.enable('cosmoshub-4');
      
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

  // Render MemeChatPage if wallet is connected
  if (walletAddress) {
    return <MemeChatPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-100 p-3 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MemeChat AI</h1>
          <p className="text-gray-600 text-center mt-2">Connect your Keplr wallet to start creating amazing memes</p>
        </div>

        <div className="space-y-6">
          {/* Wallet Status */}
          {walletAddress && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Wallet Connected</p>
              <p className="text-xs text-green-600 mt-1 break-all">
                {walletAddress}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Connect Button */}
          <button
            onClick={connectKeplerWallet}
            disabled={isConnecting || !!walletAddress}
            className={`w-full flex justify-center items-center gap-2 px-4 py-3 border border-transparent text-sm font-medium rounded-lg
              ${walletAddress 
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition-colors duration-200`}
          >
            {isConnecting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : walletAddress ? (
              <>
                <Wallet className="w-5 h-5" />
                <span>Connected to Keplr</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Connect Keplr Wallet</span>
              </>
            )}
          </button>

          {!walletAddress && (
            <div className="border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-500">
                By connecting your wallet, you agree to our{' '}
                <button className="text-indigo-500 hover:text-indigo-600">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-indigo-500 hover:text-indigo-600">
                  Privacy Policy
                </button>
              </p>
            </div>
          )}
        </div>

        {!walletAddress && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to Web3?</span>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              <a
                href="https://www.keplr.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-600 font-medium"
              >
                Learn how to set up a Keplr wallet →
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
