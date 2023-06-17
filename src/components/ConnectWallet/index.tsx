import { Select } from '@chakra-ui/react';

import useAccount from 'hooks/useAccount';
import React from 'react';

import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';
import { shorten } from 'utils/utils';

export default function ConnectWallet() {
  const { getAccounts, getAccount } = useAccount();

  const loadAccount =
    getAccounts && getAccount
      ? getAccounts.filter(item => item.address !== getAccount.address)
      : getAccounts;

  return (
    <Select
      placeholder={
        getAccount ? shorten(getAccount.address, 6) : 'Connect Wallet'
      }
      onChange={e => {
        const { value } = e.target;

        localStorage.setItem(GAFI_WALLET_ACCOUNT_KEY, value);
        location.reload();
      }}
    >
      {loadAccount
        ? loadAccount.map(item => (
            <option key={item.address} value={item.address}>
              {shorten(item.address, 6)}
            </option>
          ))
        : null}
    </Select>
  );
}
