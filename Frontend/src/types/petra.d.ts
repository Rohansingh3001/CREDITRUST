// Type declarations for Petra Wallet
interface Window {
  aptos?: {
    connect(): Promise<{ address: string; publicKey: string }>;
    disconnect(): Promise<void>;
    account(): Promise<any>;
    isConnected(): Promise<boolean>;
    network(): Promise<{ name: string; chainId: string }>;
    signAndSubmitTransaction(transaction: any): Promise<any>;
    signMessage(message: { message: string; nonce: string }): Promise<any>;
    onAccountChange?: (listener: (newAccount: { address: string; publicKey: string } | null) => void) => void;
    onNetworkChange?: (listener: (newNetwork: { name: string; chainId: string }) => void) => void;
  };
}

// Extend the global Window interface
declare global {
  interface Window {
    aptos?: {
      connect(): Promise<{ address: string; publicKey: string }>;
      disconnect(): Promise<void>;
      account(): Promise<any>;
      isConnected(): Promise<boolean>;
      network(): Promise<{ name: string; chainId: string }>;
      signAndSubmitTransaction(transaction: any): Promise<any>;
      signMessage(message: { message: string; nonce: string }): Promise<any>;
      onAccountChange?: (listener: (newAccount: { address: string; publicKey: string } | null) => void) => void;
      onNetworkChange?: (listener: (newNetwork: { name: string; chainId: string }) => void) => void;
    };
  }
}

export {};
