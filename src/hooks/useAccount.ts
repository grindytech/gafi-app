import config from 'config';
import React, { useState } from 'react';
import {
  GAFI_WALLET_ACCOUNT_KEY,
  GAFI_WALLET_STORAGE_KEY,
} from 'utils/constants';
import { getInjectedWeb3 } from 'utils/utils';

export interface stateAccountProps {
  name: string;
  address: string;
  genesisHash: string;
  type: string;
}

export default function useAccount() {
  const [account, setAccount] = useState<stateAccountProps[]>();

  const checkCurrentAccount = localStorage.getItem(GAFI_WALLET_ACCOUNT_KEY);
  const checkAccount = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);

  const currentAccount =
    checkCurrentAccount && account
      ? account.filter(item => item.address === checkCurrentAccount)[0]
      : null;

  React.useEffect(() => {
    const getAccounts = async () => {
      const injtected = await getInjectedWeb3();

      if (checkAccount && injtected) {
        const getAccounts = await injtected.accounts.get();

        setAccount(getAccounts as keyof typeof account);
      }
    };

    getAccounts();
  }, []);

  return {
    getAccounts: account,
    getAccount: currentAccount,
  };
}
