import { formatBalance } from '@polkadot/util';
import { useSubstrateState } from 'contexts/substrateContext';
import React, { useState } from 'react';
import { chainDecimal } from 'utils/constants';

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
  const { api } = useSubstrateState();

  React.useEffect(() => {
    const getBalance = async () => {
      if (api && api.query.system) {
        const res = await api.query.system.account(account);

        const getBalance = res.toPrimitive() as TypeGetBalance;

        setBalance(
          formatBalance(
            getBalance.data.free,
            {
              withSi: false,
              forceUnit: '-',
            },
            chainDecimal
          )
        );
      }
    };
    getBalance();
  }, [api?.query, account]);

  return {
    balance,
  };
}
