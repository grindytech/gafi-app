import { Flex, FlexProps, Heading } from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import GafiAmount from 'components/GafiAmount';
import { useSubstrateState } from 'contexts/substrateContext';

import React, { useState } from 'react';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface BalanceProps {
  currentAccount: string;
  sx?: FlexProps;
}

export default function Balance({ currentAccount, sx }: BalanceProps) {
  const [balance, setBalance] = useState<string>('...');
  const { api, chainDecimal } = useSubstrateState();

  React.useEffect(() => {
    const getBalance = async () => {
      if (api && api.query.system) {
        const res = await api.query.system.account(currentAccount);

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
  }, [api?.query, currentAccount]);

  return (
    <Flex justifyContent="space-between" alignItems="center" {...sx}>
      <Heading
        className="account-balance"
        fontSize="md"
        fontWeight="medium"
        color="shader.a.600"
      >
        Balance
      </Heading>

      <GafiAmount amount={balance} />
    </Flex>
  );
}
