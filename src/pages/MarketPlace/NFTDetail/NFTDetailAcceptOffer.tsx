import { Button, ButtonProps } from '@chakra-ui/react';
import useSetBuyClamied from 'hooks/useSetBuyClaimed';

interface NFTDetailAcceptOfferProps {
  trade_id: number;
  amount: number;
  price: number;
  sx?: ButtonProps;
  refetch?: () => void;
}

export default function NFTDetailAcceptOffer({
  trade_id,
  amount,
  price,
  sx,
  refetch,
}: NFTDetailAcceptOfferProps) {
  const { isLoading, mutation } = useSetBuyClamied({
    trade_id,
    amount,
    price,
    refetch() {
      if (refetch) {
        refetch();
      }
    },
  });

  return (
    <Button
      variant="primary"
      _hover={{}}
      isLoading={isLoading}
      onClick={mutation}
      {...sx}
    >
      Accept
    </Button>
  );
}
