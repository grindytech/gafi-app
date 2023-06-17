import { Flex, FlexProps, Heading } from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import GafiAmount from 'components/GafiAmount';
import { useSubstrateState } from 'contexts/substrateContext';
import useAccount from 'hooks/useAccount';
import React, { useState } from 'react';

type TypeGetBalance = {
  data: {
    free: string;
  };
};

interface BalanceProps {
  sx?: FlexProps;
}

export default function Balance({ sx }: BalanceProps) {
  const [balance, setBalance] = useState<string>('...');

  const { getAccount } = useAccount();
  const { api, chainDecimal } = useSubstrateState();

  React.useEffect(() => {
    const getBalance = async () => {
      if (api && api.query.system && getAccount) {
        const res = await api.query.system.account(getAccount.address);

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
  }, [api?.query]);

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
