# 🚀 Aptos Smart Contract Integration Guide

This guide will help you integrate your Web3 Learning Platform frontend with Aptos smart contracts.

## 📋 Prerequisites

- Node.js v18+ installed
- Petra Wallet browser extension
- Basic knowledge of Aptos blockchain

## 🛠️ Installation Steps

### 1. Install Required Dependencies

```powershell
# Navigate to the Frontend directory
cd Frontend

# Install Aptos SDK
npm install @aptos-labs/ts-sdk

# Or if using yarn
yarn add @aptos-labs/ts-sdk

# Install all dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the Frontend directory:

```powershell
# Copy the example environment file
copy .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Aptos Smart Contract Configuration
VITE_SMART_CONTRACT_ADDRESS=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
VITE_MODULE_NAME=web3_learning_platform
VITE_APTOS_NETWORK=devnet

# Optional: Custom RPC endpoint
VITE_APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com/v1
```

### 3. Deploy Your Smart Contract (Optional)

If you haven't deployed your smart contract yet:

1. **Install Aptos CLI:**
   ```powershell
   # Download Aptos CLI from GitHub releases
   # https://github.com/aptos-labs/aptos-core/releases
   ```

2. **Initialize Aptos Account:**
   ```powershell
   aptos init --network devnet
   ```

3. **Deploy Smart Contract:**
   ```powershell
   # Navigate to your smart contract directory
   cd path/to/your/contract
   
   # Compile and deploy
   aptos move publish --named-addresses web3_learning_platform=default
   ```

4. **Update Environment Variables:**
   - Copy the deployed contract address
   - Update `VITE_SMART_CONTRACT_ADDRESS` in your `.env` file

### 4. Petra Wallet Setup

1. **Install Petra Wallet:**
   - Visit [petra.app](https://petra.app/)
   - Install the browser extension
   - Create or import a wallet

2. **Switch to Devnet:**
   - Open Petra wallet
   - Go to Settings → Network
   - Select "Devnet" for testing

3. **Fund Your Wallet:**
   - Visit [Aptos Faucet](https://www.aptosfaucet.com/)
   - Enter your wallet address
   - Request devnet APT tokens

### 5. Start the Development Server

```powershell
# Start the frontend development server
npm run dev

# The app will be available at http://localhost:5173
```

## 🔧 Smart Contract Functions

Your smart contract should implement these functions:

### Required Functions:

```move
// Create user profile
public entry fun create_user_profile(account: &signer)

// Complete wallet connection action
public entry fun complete_wallet_connection(account: &signer)

// Complete message signing action  
public entry fun complete_message_signing(account: &signer)

// Mint achievement SBT
public entry fun mint_achievement_sbt(account: &signer, name: String, description: String)

// Complete APT transfer action
public entry fun complete_apt_transfer(account: &signer)
```

### Required Resources:

```move
// User profile resource
struct UserProfile has key {
    xp: u64,
    actions_completed: u64,
    sbts_earned: u64,
    created_at: u64,
}

// Soulbound Token resource
struct SoulboundToken has key {
    id: String,
    name: String,
    description: String,
    properties: SimpleMap<String, String>,
    created_at: u64,
}
```

## 📁 File Structure

Your project should have this structure:

```
Frontend/
├── .env                    # Environment variables
├── src/
│   ├── config/
│   │   └── aptos.ts       # Aptos configuration
│   ├── components/
│   │   ├── Dashboard.tsx   # Main dashboard component
│   │   ├── WalletConnect.tsx
│   │   └── ...
│   └── pages/
│       └── Index.tsx      # Main page with routing
└── package.json
```

## 🧪 Testing the Integration

### 1. Connect Wallet
- Click "Enter Playground" on the landing page
- Petra wallet should prompt for connection
- After connecting, you should see the dashboard

### 2. Test Actions
- Try the "Sign Message" action first (doesn't require smart contract)
- Test other actions if your smart contract is deployed
- Check for XP updates and achievement unlocks

### 3. Verify Data
- Check browser console for transaction hashes
- Verify transactions on [Aptos Explorer](https://explorer.aptoslabs.com/?network=devnet)
- Ensure user stats update correctly

## 🐛 Troubleshooting

### Common Issues:

1. **Petra Wallet Not Detected:**
   ```javascript
   // Check if Petra is installed
   if (!window.aptos) {
     console.error('Petra wallet not installed');
     // Redirect to petra.app
   }
   ```

2. **Environment Variables Not Loading:**
   - Ensure `.env` file is in the root Frontend directory
   - Restart the development server after changing `.env`
   - Use `VITE_` prefix for Vite environment variables

3. **Smart Contract Not Found:**
   - Verify the contract address in `.env`
   - Ensure the contract is deployed on the correct network
   - Check the module name matches your smart contract

4. **Transaction Failures:**
   - Check your wallet has sufficient APT for gas fees
   - Verify function names match your smart contract
   - Check Aptos Explorer for detailed error messages

### Debug Mode:

Enable detailed logging by adding to your `.env`:

```env
VITE_DEBUG=true
```

## 🚀 Production Deployment

### 1. Environment Setup
- Create production `.env` file
- Update smart contract address for mainnet
- Set `VITE_APTOS_NETWORK=mainnet`

### 2. Build and Deploy
```powershell
# Build for production
npm run build

# Deploy to your hosting service
# (Vercel, Netlify, AWS, etc.)
```

### 3. Mainnet Considerations
- Ensure smart contract is audited
- Test thoroughly on devnet first
- Monitor gas fees and optimize transactions

## 📚 Additional Resources

- [Aptos Documentation](https://aptos.dev/)
- [Petra Wallet Documentation](https://petra.app/docs)
- [Aptos TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Move Language Guide](https://move-language.github.io/move/)

## 💡 Next Steps

1. **Enhance Smart Contract:**
   - Add more complex game mechanics
   - Implement NFT collections
   - Add staking/rewards system

2. **Improve Frontend:**
   - Add transaction history
   - Implement real-time updates
   - Add mobile-responsive design

3. **Security:**
   - Implement proper error handling
   - Add transaction confirmation dialogs
   - Validate all user inputs

---

Need help? Check the [Issues](https://github.com/your-repo/issues) section or create a new issue.
