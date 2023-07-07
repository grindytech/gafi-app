import React, { useState } from 'react';
import { useAppSelector } from './useRedux';
import { formatGAFI } from 'utils/utils';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface useBalanceProps {
  account: string | null | undefined;
  refetch?: () => void;
}

export default function useBalance({ account, refetch }: useBalanceProps) {
  const [balance, setBalance] = useState<string | undefined>();
  const { api } = useAppSelector(state => state.substrate);

  React.useEffect(() => {
    const getBalance = async () => {
      if (api && api.query.system && account) {
        const res = await api.query.system.account(account);

        const getBalance = res.toPrimitive() as TypeGetBalance;

        setBalance(formatGAFI(getBalance.data.free));
      }
    };
    getBalance();
  }, [api?.query, account, refetch]);

  return {
    balance,
  };
}
