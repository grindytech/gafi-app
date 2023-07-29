import { Button, ButtonProps } from '@chakra-ui/react';
import { GafiSupportGameTypesTradeType } from '@polkadot/types/lookup';
import useTradeCanceled from 'hooks/useTradeCanceled';

interface CancelTradeProps {
  trade_id: number;
  type: GafiSupportGameTypesTradeType['type'];
  sx?: ButtonProps;
  refetch?: () => void;
}

export default function CancelTrade({
  trade_id,
  type,
  sx,
  refetch,
}: CancelTradeProps) {
  const { isLoading, mutation } = useTradeCanceled({
    trade_id,
    type: type,
    refetch() {
      if (refetch) {
        refetch();
      }
    },
  });

  return (
    <Button
      variant="cancel"
      _hover={{}}
      isLoading={isLoading}
      onClick={mutation}
      {...sx}
    >
      Cancel
    </Button>
  );
}
