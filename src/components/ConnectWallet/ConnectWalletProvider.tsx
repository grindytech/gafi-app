import React, { Dispatch } from 'react';
import {
  GAFI_WALLET_ACCOUNT_KEY,
  GAFI_WALLET_STORAGE_KEY,
} from 'utils/constants';
import { getInjectedWeb3 } from 'utils/utils';
import { InjectedAccount } from '@polkadot/extension-inject/types';

import useForceMount from 'hooks/useForceMount';
import ConnectWalletModal from './ConnectWalletModal';
import { useSubstrateState } from 'contexts/substrateContext';

export interface stateAccountProps {
  account: string | null | undefined;
  allAccount?: InjectedAccount[] | undefined;
}

interface ConnetWalletContextProps {
  account: stateAccountProps['account'];
  allAccount: stateAccountProps['allAccount'];
  setAccount: Dispatch<React.SetStateAction<stateAccountProps>>;
}

const ConnetWalletContext = React.createContext<ConnetWalletContextProps>({
  account: undefined,
  allAccount: [],
  setAccount: () => ({}),
});

export default function ConnectWalletProvider({
  children,
}: React.PropsWithChildren) {
  const { apiState } = useSubstrateState();
  const { mounting, setMounting } = useForceMount();
  const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);

  const [account, setAccount] = React.useState<stateAccountProps>({
    account: localStorage.getItem(GAFI_WALLET_ACCOUNT_KEY),
  });

  React.useEffect(() => {
    if (apiState === 'READY') {
      const getAccounts = async () => {
        const injtected = await getInjectedWeb3();

        if (injtected) {
          const getAccounts = await injtected.accounts.get();

          if (account.allAccount && !account.allAccount.length) {
            localStorage.removeItem(GAFI_WALLET_ACCOUNT_KEY);
          }

          setAccount(prev => ({
            ...prev,
            allAccount: getAccounts,
          }));
        }
      };

      getAccounts();
    }
  }, [apiState, mounting]);

  return (
    <ConnetWalletContext.Provider
      value={{
        account: account.account,
        allAccount: account.allAccount,
        setAccount,
      }}
    >
      {!extensionName && (
        <ConnectWalletModal
          mounting={mounting % 2 === 0}
          setMounting={setMounting}
        />
      )}

      {children}
    </ConnetWalletContext.Provider>
  );
}

export const useConnectWallet = () => {
  const { account, allAccount, setAccount } =
    React.useContext(ConnetWalletContext);

  return { account, allAccount, setAccount };
};
