import { Flex, FlexProps, Heading, Skeleton } from '@chakra-ui/react';
import GafiAmount from 'components/GafiAmount';
import useBalance from 'hooks/useBalance';

interface BalanceProps {
  currentAccount: string;
  sx?: FlexProps;
}

export default function Balance({ currentAccount, sx }: BalanceProps) {
  const { balance } = useBalance({
    account: currentAccount,
  });

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

      {balance ? (
        <GafiAmount amount={balance} />
      ) : (
        <Skeleton width={4} height={4} />
      )}
    </Flex>
  );
}
