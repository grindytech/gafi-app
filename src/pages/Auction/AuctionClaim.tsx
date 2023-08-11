import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import { useParams } from 'react-router-dom';

export default function AuctionClaim() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { id } = useParams();

  const { isLoading, mutation } = useSignAndSend({
    key: [`claim_auction/${id}`],
    address: account?.address as string,
  });

  return (
    <>
      <Button
        borderRadius="3xl"
        width="fit-content"
        px={10}
        py={6}
        _hover={{}}
        isLoading={isLoading}
        onClick={() => {
          if (api) {
            mutation(api.tx.game.claimAuction(Number(id)));
          }
        }}
        variant="primary"
      >
        Claim Auction
      </Button>
    </>
  );
}
