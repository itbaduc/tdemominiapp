import { useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet();
      const wallet = await tonConnectUI.getWalletInfo();
      if (wallet) {
        setWalletAddress(wallet.address);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Đã kết nối: {walletAddress}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;