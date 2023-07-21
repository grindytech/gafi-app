import React, { useState } from 'react';
import { useAppSelector } from './useRedux';
import { formatGAFI } from 'utils/utils';
import useSubscribeSystem from './useSubscribeSystem';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface useBalanceProps {
  account: string | null | undefined;
}

export default function useBalance({ account }: useBalanceProps) {
  const { event } = useSubscribeSystem('balances::Endowed');

  const [balance, setBalance] = useState<string | undefined>();
  const { api } = useAppSelector(state => state.substrate);

  React.useEffect(() => {
    const getBalance = () => {
      const callback = async () => {
        if (api && api.query.system && account) {
          const res = await api.query.system.account(account);

          const getBalance = res.toPrimitive() as TypeGetBalance;

          setBalance(formatGAFI(getBalance.data.free));
        }
      };

      callback();
    };

    if (event) {
      event.forEach(({ eventValue }) => {
        const [address] = JSON.parse(eventValue);

        if (address === account) {
          getBalance();
        }
      });
    }

    getBalance();

    return () => getBalance();
  }, [event, account]);

  return {
    balance,
  };
}
