import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';

interface NFTDetailCancelOfferProps {
  trade_id: number;
}

export default function NFTDetailCancelOffer({
  trade_id,
}: NFTDetailCancelOfferProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['cancel_offer', String(trade_id)],
    address: account?.address as string,
  });

  return (
    <Button
      variant="cancel"
      mr={4}
      isLoading={isLoading}
      onClick={() => {
        if (api) {
          mutation(api.tx.game.cancelTrade(trade_id, 'SetPrice'));
        }
      }}
    >
      Cancel
    </Button>
  );
}
