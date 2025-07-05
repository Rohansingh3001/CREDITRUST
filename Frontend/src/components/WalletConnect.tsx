import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletConnectProps {
  isConnected: boolean;
  onConnect: (connected: boolean) => void;
}

const WalletConnect = ({ isConnected, onConnect }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("0.00");
  const [isPetraInstalled, setIsPetraInstalled] = useState(false);
  const [error, setError] = useState<string>("");

  // Check if Petra wallet is installed and listen for account changes
  useEffect(() => {
    const checkPetraWallet = () => {
      if (typeof window !== 'undefined') {
        const isInstalled = !!window.aptos;
        setIsPetraInstalled(isInstalled);
        
        // Set up account change listener if Petra is installed
        if (isInstalled && window.aptos?.onAccountChange) {
          window.aptos.onAccountChange((newAccount) => {
            if (newAccount && newAccount.address) {
              setWalletAddress(newAccount.address);
              onConnect(true);
            } else {
              handleDisconnect();
            }
          });
        }
      }
    };
    
    checkPetraWallet();
    
    // Listen for Petra wallet installation
    const handleLoad = () => checkPetraWallet();
    window.addEventListener('load', handleLoad);
    
    return () => window.removeEventListener('load', handleLoad);
  }, [onConnect]);

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isPetraInstalled && window.aptos) {
        try {
          const isConnected = await window.aptos.isConnected();
          if (isConnected) {
            const account = await window.aptos.account();
            if (account.address) {
              setWalletAddress(account.address);
              onConnect(true);
              
              // Get balance
              try {
                const resources = await window.aptos.account();
                const accountResource = resources.find((r: any) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
                if (accountResource) {
                  const balance = (parseInt(accountResource.data.coin.value) / 100000000).toFixed(2);
                  setBalance(balance);
                }
              } catch (balanceError) {
                console.warn("Could not fetch balance:", balanceError);
                setBalance("0.00");
              }
            }
          }
        } catch (err) {
          console.log("No existing connection found");
        }
      }
    };

    if (isPetraInstalled) {
      checkConnection();
    }
  }, [isPetraInstalled, onConnect]);

  const handleConnect = async () => {
    if (!isPetraInstalled) {
      // Open Petra wallet installation page
      window.open('https://petra.app/', '_blank');
      setError("Please install Petra wallet to continue");
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      // Connect to Petra wallet
      const response = await window.aptos.connect();
      
      if (response.address) {
        setWalletAddress(response.address);
        onConnect(true);
        
        // Get wallet balance (optional)
        try {
          const resources = await window.aptos.account();
          const accountResource = resources.find((r: any) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
          if (accountResource) {
            const balance = (parseInt(accountResource.data.coin.value) / 100000000).toFixed(2);
            setBalance(balance);
          }
        } catch (balanceError) {
          console.warn("Could not fetch balance:", balanceError);
          setBalance("0.00");
        }
      }
    } catch (err: any) {
      console.error("Failed to connect to Petra wallet:", err);
      setError(err.message || "Failed to connect to Petra wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (window.aptos && window.aptos.disconnect) {
        await window.aptos.disconnect();
      }
      setWalletAddress("");
      setBalance("0.00");
      onConnect(false);
    } catch (err) {
      console.error("Failed to disconnect:", err);
      // Force disconnect even if API call fails
      setWalletAddress("");
      setBalance("0.00");
      onConnect(false);
    }
  };

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  const openInExplorer = () => {
    if (walletAddress) {
      window.open(`https://explorer.aptoslabs.com/account/${walletAddress}?network=devnet`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-md transition-all text-sm sm:text-base"
        >
          <Wallet className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">
            {isConnecting ? "Connecting..." : isPetraInstalled ? "Connect Petra" : "Install Petra"}
          </span>
          <span className="sm:hidden">
            {isConnecting ? "..." : isPetraInstalled ? "Connect" : "Install"}
          </span>
        </Button>
        
        {error && (
          <div className="flex items-center gap-1 text-xs text-red-400 max-w-[200px] text-center">
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {!isPetraInstalled && !error && (
          <p className="text-xs text-slate-400 text-center max-w-[200px]">
            Petra wallet required for connection
          </p>
        )}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-slate-800/60 text-slate-100 border border-slate-700/60 hover:bg-slate-700/60 transition-all rounded-xl shadow-sm px-2 sm:px-3"
        >
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="hidden sm:inline font-mono text-sm">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <span className="sm:hidden font-mono text-xs">
              {walletAddress.slice(0, 4)}...
            </span>
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 sm:w-80 bg-slate-900/90 border border-slate-700/50 backdrop-blur-md shadow-xl rounded-xl p-0">
        <div className="p-4">
          {/* Wallet Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-base font-medium text-slate-100">Petra Wallet</p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-emerald-400">Connected</span>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <Card className="bg-slate-800/50 border border-slate-700/50 shadow-inner mb-4">
            <CardContent className="p-3">
              <p className="text-xs text-slate-400 mb-1">Wallet Address</p>
              <div className="flex items-center justify-between">
                <code className="text-sm text-slate-100 font-mono truncate max-w-[180px]">
                  {walletAddress}
                </code>
                <Button size="sm" variant="ghost" onClick={copyAddress} className="h-6 w-6 p-0 text-slate-400 hover:text-white">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Balance */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-slate-400">Balance</span>
            <div className="text-right">
              <p className="text-slate-100 font-semibold">{balance} APT</p>
              <p className="text-xs text-slate-400">Devnet</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-700/60" />

        {/* Explorer & Disconnect */}
        <DropdownMenuItem onClick={openInExplorer} className="text-slate-100 hover:bg-slate-800/50 px-4 py-2">
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="text-red-400 hover:bg-red-500/10 px-4 py-2"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;
