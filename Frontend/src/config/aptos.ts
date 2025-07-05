// src/config/aptos.ts
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Configure Aptos network
export const APTOS_NETWORK = (import.meta.env.VITE_APTOS_NETWORK as Network) || Network.DEVNET;

// Smart contract configuration
export const SMART_CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT_ADDRESS || "0x1";
export const MODULE_NAME = import.meta.env.VITE_MODULE_NAME || "web3_learning_platform";

// Aptos client instance
export const aptosConfig = new AptosConfig({ 
  network: APTOS_NETWORK,
  fullnode: import.meta.env.VITE_APTOS_NODE_URL
});

export const aptos = new Aptos(aptosConfig);

// Type definitions for Petra wallet
export interface AptosWallet {
  connect: () => Promise<{ address: string; publicKey: string }>;
  account: () => Promise<{ address: string; publicKey: string }>;
  isConnected: () => Promise<boolean>;
  signAndSubmitTransaction: (transaction: any) => Promise<{ hash: string }>;
  signMessage: (message: { message: string; nonce: string }) => Promise<any>;
  network: () => Promise<{ name: string; chainId: string }>;
  disconnect: () => Promise<void>;
  onAccountChange: (listener: (account: any) => void) => void;
  onNetworkChange: (listener: (network: any) => void) => void;
}

// Utility functions for interacting with smart contracts
export const createUserProfile = async (userAddress: string) => {
  if (!window.aptos) {
    throw new Error('Petra wallet not connected');
  }

  const payload = {
    type: "entry_function_payload",
    function: `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::create_user_profile`,
    arguments: [],
    type_arguments: []
  };

  return await window.aptos.signAndSubmitTransaction(payload);
};

export const completeAction = async (actionType: string) => {
  if (!window.aptos) {
    throw new Error('Petra wallet not connected');
  }

  const payload = {
    type: "entry_function_payload",
    function: `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::complete_action`,
    arguments: [actionType],
    type_arguments: []
  };

  return await window.aptos.signAndSubmitTransaction(payload);
};

export const mintAchievementSBT = async (achievementName: string, description: string) => {
  if (!window.aptos) {
    throw new Error('Petra wallet not connected');
  }

  const payload = {
    type: "entry_function_payload",
    function: `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::mint_achievement_sbt`,
    arguments: [achievementName, description],
    type_arguments: []
  };

  return await window.aptos.signAndSubmitTransaction(payload);
};

// Fetch user profile data from the smart contract
export const getUserProfile = async (userAddress: string) => {
  try {
    const resourceType = `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::UserProfile` as `${string}::${string}::${string}`;
    const userProfile = await aptos.getAccountResource({
      accountAddress: userAddress,
      resourceType: resourceType
    });
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Fetch user's achievements/SBTs
export const getUserAchievements = async (userAddress: string) => {
  try {
    const resourceType = `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::AchievementCollection` as `${string}::${string}::${string}`;
    const achievements = await aptos.getAccountResource({
      accountAddress: userAddress,
      resourceType: resourceType
    });
    return achievements;
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
};

// Fetch user's activity history
export const getUserActivity = async (userAddress: string) => {
  try {
    const resourceType = `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::ActivityHistory` as `${string}::${string}::${string}`;
    const activity = await aptos.getAccountResource({
      accountAddress: userAddress,
      resourceType: resourceType
    });
    return activity;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return [];
  }
};

// Fetch learning modules/challenges
export const getLearningModules = async () => {
  try {
    const resourceType = `${SMART_CONTRACT_ADDRESS}::${MODULE_NAME}::LearningModules` as `${string}::${string}::${string}`;
    const modules = await aptos.getAccountResource({
      accountAddress: SMART_CONTRACT_ADDRESS,
      resourceType: resourceType
    });
    return modules;
  } catch (error) {
    console.error('Error fetching learning modules:', error);
    return [];
  }
};

// Calculate trust score based on user data
export const calculateTrustScore = async (userAddress: string) => {
  try {
    const userProfile = await getUserProfile(userAddress);
    const achievements = await getUserAchievements(userAddress);
    
    if (userProfile && achievements) {
      // Simple trust score calculation based on achievements and activity
      const baseScore = 500;
      const achievementBonus = Array.isArray(achievements) ? achievements.length * 50 : 0;
      const activityBonus = userProfile.completed_actions || 0 * 10;
      
      return Math.min(1000, baseScore + achievementBonus + activityBonus);
    }
    
    return 500; // Default score
  } catch (error) {
    console.error('Error calculating trust score:', error);
    return 500;
  }
};
