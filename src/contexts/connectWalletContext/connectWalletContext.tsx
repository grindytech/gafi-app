import React, { useContext, useState } from 'react';

import WalletConnect from 'layouts/WalletConnect/WalletConnect';
import { GAFI_WALLET_STORAGE_KEY } from 'utils/constants';

const ConnectWalletContext = React.createContext<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}>({
  isOpen: true,
  onOpen: () => {},
  onClose: () => {},
});

const ConnectWalletProvider: React.FC<Record<string, unknown>> = props => {
  const checkPolkadotAccounts = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);
  const { children } = props;
  const [isOpen, setIsOpen] = useState(!checkPolkadotAccounts);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <ConnectWalletContext.Provider value={{ isOpen, onOpen, onClose }}>
        <WalletConnect />
        {children}
      </ConnectWalletContext.Provider>
    </>
  );
};

const useConnectWallet = () => {
  const { isOpen, onClose, onOpen } = useContext(ConnectWalletContext);

  return {
    isOpen,
    onClose,
    onOpen,
  };
};

export { ConnectWalletProvider, useConnectWallet };
