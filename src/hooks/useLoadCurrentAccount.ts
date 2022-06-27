import { KeyringPair } from '@polkadot/keyring/types';
import { useCallback, useEffect } from 'react';
import { useWallet } from 'use-wallet';

import { useSubstrate } from 'contexts/substrateContext';
import { getGAKIAccountAddress } from 'utils';

const useLoadCurrentAccount = () => {
  const { account } = useWallet();
  const { setCurrentAccount, state } = useSubstrate();
  const { api, keyring, currentAccount } = state;

  const pairs = keyring?.getPairs() || [];

  const setPolkadotAccount = useCallback(async () => {
    const response = await api?.query.proofAddressMapping.h160Mapping(account);
    const polkadotAccount = response?.toHuman() || '';
    const initPair = pairs.find(
      (pair: KeyringPair) =>
        getGAKIAccountAddress(pair.addressRaw) === polkadotAccount
    );

    if (initPair) {
      setCurrentAccount(initPair);
    } else if (pairs.length > 0) {
      setCurrentAccount(pairs[0]);
    }
  }, [account, api, keyring]);

  useEffect(() => {
    if (!currentAccount) setPolkadotAccount();
  }, [setPolkadotAccount]);

  return {
    pairs,
  };
};

export default useLoadCurrentAccount;
