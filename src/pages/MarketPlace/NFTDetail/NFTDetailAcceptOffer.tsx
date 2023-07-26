import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';

interface NFTDetailAcceptOfferProps {
  trade_id: number;
  amount: number;
  price: number;
}

export default function NFTDetailAcceptOffer({
  trade_id,
  amount,
  price,
}: NFTDetailAcceptOfferProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['cancel_offer', String(trade_id)],
    address: account?.address as string,
  });

  return (
    <>
      <Button
        variant="primary"
        isLoading={isLoading}
        onClick={() => {
          if (api) {
            mutation(api.tx.game.claimSetBuy(trade_id, amount, price));
          }
        }}
      >
        Accept
      </Button>
    </>
  );
}
