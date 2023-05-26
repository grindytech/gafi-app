import { KeyringPair } from '@polkadot/keyring/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useWallet } from 'use-wallet';

import { useSubstrate } from 'contexts/substrateContext';
import { getGAKIAccountAddress } from 'utils';

const useLoadCurrentAccount = () => {
  const { account } = useWallet();
  const { setCurrentAccount, state } = useSubstrate();
  const { api, keyring, currentAccount } = state;

  const pairs = useMemo(() => keyring?.getPairs() || [], [keyring]);

  const setPolkadotAccount = useCallback(async () => {
    const response = await api?.query.proofAddressMapping.h160Mapping(account);
    const gafiAddress = response?.toHuman() || '';
    const initPair = pairs.find(
      (pair: KeyringPair) =>
        getGAKIAccountAddress(pair.addressRaw) === gafiAddress
    );

    if (initPair) {
      setCurrentAccount(initPair);
    } else if (pairs.length > 0) {
      setCurrentAccount(pairs[0]);
    }
  }, [account, api?.query.proofAddressMapping, pairs, setCurrentAccount]);

  useEffect(() => {
    if (!currentAccount) setPolkadotAccount();
  }, [currentAccount, setPolkadotAccount]);

  return {
    pairs,
  };
};

export default useLoadCurrentAccount;
