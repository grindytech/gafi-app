import { formatBalance } from '@polkadot/util';
import React, { useState } from 'react';
import { chainDecimal } from 'utils/constants';
import { useAppSelector } from './useRedux';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface useBalanceProps {
  account: string | null | undefined;
}

export default function useBalance({ account }: useBalanceProps) {
  const [balance, setBalance] = useState<string | undefined>();
  const { api } = useAppSelector(state => state.substrate);

  React.useEffect(() => {
    const getBalance = async () => {
      if (api && api.query.system && account) {
        const res = await api.query.system.account(account);

        const getBalance = res.toPrimitive() as TypeGetBalance;

        setBalance(
          formatBalance(getBalance.data.free, {
            withSi: false,
            forceUnit: '-',
            decimals: chainDecimal,
          })
        );
      }
    };
    getBalance();
  }, [api?.query, account]);

  return {
    balance,
  };
}
