import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
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
  const mockAddress = "0x742d35Cc6634C0532925a3b8D7389C5e57";

  const handleConnect = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      onConnect(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    onConnect(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(mockAddress);
  };

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-md transition-all text-sm sm:text-base"
      >
        <Wallet className="h-4 w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">{isConnecting ? "Connecting..." : "Connect Wallet"}</span>
        <span className="sm:hidden">{isConnecting ? "..." : "Connect"}</span>
      </Button>
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
              {mockAddress.slice(0, 6)}...{mockAddress.slice(-4)}
            </span>
            <span className="sm:hidden font-mono text-xs">
              {mockAddress.slice(0, 4)}...
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
                  {mockAddress}
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
              <p className="text-slate-100 font-semibold">12.45 APT</p>
              <p className="text-xs text-slate-400">≈ $156.80</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-700/60" />

        {/* Explorer & Disconnect */}
        <DropdownMenuItem className="text-slate-100 hover:bg-slate-800/50 px-4 py-2">
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
