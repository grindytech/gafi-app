import React, { useState } from 'react';

import { formatGAFI } from 'utils';
import useSubscribeSystem from './useSubscribeSystem';
import { useSubstrateContext } from 'contexts/contexts.substrate';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface useBalanceProps {
  account: string | null | undefined;
}

export default function useBalance({ account }: useBalanceProps) {
  const { api } = useSubstrateContext();
  const { event } = useSubscribeSystem('balances::Endowed');

  const [balance, setBalance] = useState<string | undefined>();

  React.useEffect(() => {
    const getBalance = () => {
      if (event) {
        event.forEach(({ eventValue }) => {
          const [address] = JSON.parse(eventValue);

          if (address === account) {
            getBalance();
          }
        });
      }

      const callback = async () => {
        if (api?.query.system && account) {
          const res = await api.query.system.account(account);

          const getBalance = res.toPrimitive() as TypeGetBalance;

          setBalance(formatGAFI(getBalance.data.free));
        }
      };

      callback();
    };

    getBalance();

    return () => getBalance();
  }, [event, account, api]);

  return {
    balance,
  };
}
