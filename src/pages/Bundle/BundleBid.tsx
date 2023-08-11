import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import { useParams } from 'react-router-dom';

interface BundleBidProps {
  maybePrice: string;
}

export default function BundleBid({ maybePrice }: BundleBidProps) {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const { id } = useParams();

  const { isLoading, mutation } = useSignAndSend({
    key: [`buy_bundle/${id}`],
    address: account?.address as string,
  });

  return (
    <Button
      borderRadius="3xl"
      width="fit-content"
      px={10}
      py={6}
      _hover={{}}
      isLoading={isLoading}
      variant="primary"
      onClick={() => {
        if (api) {
          mutation(api.tx.game.buyBundle(Number(id), Number(maybePrice)));
        }
      }}
    >
      Place a bid
    </Button>
  );
}
