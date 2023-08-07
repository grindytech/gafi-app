import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { GafiSupportGameTypesTradeType } from '@polkadot/types/lookup';
import GafiAmount from 'components/GafiAmount';
import useBlockTime from 'hooks/useBlockTime';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import { formatCurrency } from 'utils/utils';
import { AccountOwnerFieldProps } from '.';
import React from 'react';
import useSubscribeSystem from 'hooks/useSubscribeSystem';
import { useNavigate } from 'react-router-dom';

interface AccountOwnerSubmitProps {
  price: number;
  duration: number;
  type: GafiSupportGameTypesTradeType['type'];
  product: AccountOwnerFieldProps['product'];
  onSuccess: () => void;
}

export default function AccountOwnerSubmit({
  price,
  duration,
  type,
  product,
  onSuccess,
}: AccountOwnerSubmitProps) {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { mutation, isLoading } = useSignAndSend({
    key: [account?.address as string],
    address: account?.address as string,
    onSuccess,
  });

  const navigation = useNavigate();
  const { event, setEvent } = useSubscribeSystem('game::PriceSet');
  const { blockNumber } = useBlockTime('bestNumber');

  React.useEffect(() => {
    if (event) {
      event.forEach(({ eventValue }) => {
        const [trade_id, , collection_id, item_id] = JSON.parse(eventValue);

        product.forEach(({ collection, nft }) => {
          if (collection.id === collection_id && item_id === nft.id) {
            navigation(`/marketplace/bundle/${trade_id}`);
          }
        });

        // unmount event
        setEvent([]);
      });
    }
  }, [event]);

  return (
    <Box className="purchase">
      <Flex justifyContent="space-between">
        <Text as="span">Total Purchase</Text>

        <Box textAlign="right">
          <GafiAmount
            amount={price || 0}
            sx={{
              color: 'shader.a.900',
              fontWeight: 'medium',
              sx: {
                span: {
                  color: 'inherit!',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                },
              },
            }}
          />

          <Text as="span">{formatCurrency(Number(price) || 0, 'usd')}</Text>
        </Box>
      </Flex>

      <Button
        variant="primary"
        width="full"
        mt={4}
        borderRadius="xl"
        _hover={{}}
        type="submit"
        isLoading={isLoading}
        onClick={event => {
          if (api && price) {
            event.preventDefault();

            if (type === 'SetPrice') {
              mutation(
                api.tx.game.setPrice(
                  {
                    collection: product[0].collection.id,
                    item: product[0].nft.id,
                    amount: product[0].nft.selected,
                  },
                  price,
                  blockNumber,
                  blockNumber + duration
                )
              );
            }

            if (type === 'Bundle') {
              mutation(
                api.tx.game.setBundle(
                  product.map(({ collection, nft }) => ({
                    collection: collection.id,
                    item: nft.id,
                    amount: nft.selected,
                  })),
                  price,
                  blockNumber,
                  blockNumber + duration
                )
              );
            }

            if (type === 'Auction') {
              mutation(
                api.tx.game.setAuction(
                  product.map(({ collection, nft }) => ({
                    collection: collection.id,
                    item: nft.id,
                    amount: nft.selected,
                  })),
                  price,
                  blockNumber,
                  blockNumber + duration
                )
              );
            }
          }
        }}
      >
        Sign & Submit
      </Button>
    </Box>
  );
}
