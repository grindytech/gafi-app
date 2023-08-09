import { isNull } from '@polkadot/util';
import DurationBlock, { ListDurationProps } from 'components/DurationBlock';
import NumberInput from 'components/NumberInput';
import React from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { AccountOwnerFieldProps } from '.';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';

import { formatCurrency } from 'utils/utils';

import { useAppSelector } from 'hooks/useRedux';
import useBlockTime from 'hooks/useBlockTime';
import useSignAndSend from 'hooks/useSignAndSend';
import useSubscribeSystem from 'hooks/useSubscribeSystem';
import { useNavigate } from 'react-router-dom';

interface AccountOwnerSaleProps {
  watch: UseFormWatch<AccountOwnerFieldProps>;
  control: Control<any, any>;
  onSuccess: () => void;
  duration: ListDurationProps;
  setDuration: React.Dispatch<React.SetStateAction<ListDurationProps>>;
  listDuration: ListDurationProps[];
}

export default function AccountOwnerSale({
  control,
  watch,
  onSuccess,
  duration,
  setDuration,
  listDuration,
}: AccountOwnerSaleProps) {
  const { price, product: productMeta } = watch();
  const product = Object.values(productMeta).map(meta => ({ ...meta }));
  const isBundle = product.length >= 2;

  const navigate = useNavigate();

  const { api } = useAppSelector(state => state.substrate);

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { blockNumber } = useBlockTime('bestNumber');

  const { event, setEvent } = useSubscribeSystem(
    isBundle ? 'game::BundleSet' : 'game::PriceSet'
  );

  const { mutation, isLoading } = useSignAndSend({
    key: [account?.address as string],
    address: account?.address as string,
    onSuccess,
  });

  React.useEffect(() => {
    if (event && account?.address) {
      event.forEach(({ eventValue }) => {
        const [trade_id, who] = JSON.parse(eventValue);

        if (account.address === who) {
          if (isBundle) {
            return navigate(`/marketplace/bundle/${trade_id}`);
          }

          return navigate(
            `/marketplace/nft/${product[0].nft.id}/${product[0].collection.id}`
          );
        }

        setEvent([]);
      });
    }
  }, [event]);

  return (
    <>
      <Stack spacing={4} padding={6}>
        <NumberInput
          formState={{
            control: control,
            value: 'price',
            isInvalid: isNull(price),
            isRequired: true,
          }}
          heading="Price"
          sx={{
            display: 'block',
            sx: { h2: { color: 'shader.a.500', mb: 2 } },
          }}
        />

        <DurationBlock
          listDuration={listDuration}
          duration={duration}
          setCurrentDuration={setDuration}
          sx={{
            sx: { '> p': { fontSize: 'md' } },
          }}
        />
      </Stack>

      <Box
        padding={6}
        pt={4}
        color="shader.a.500"
        fontWeight="medium"
        borderTop="0.0625rem solid"
        borderColor="shader.a.300"
      >
        <Flex justifyContent="space-between">
          <Text>Total Purchase</Text>

          <Box textAlign="right">
            <Text color="shader.a.900">{price || 0} GAFI</Text>

            <Text as="span" fontSize="sm" fontWeight="normal">
              {formatCurrency(Number(price) || 0, 'usd')}
            </Text>
          </Box>
        </Flex>

        <Button
          mt={4}
          borderRadius="xl"
          width="full"
          variant="primary"
          _hover={{}}
          type="submit"
          isLoading={isLoading}
          onClick={event => {
            if (api && price) {
              event.preventDefault();

              if (isBundle) {
                return mutation(
                  api.tx.game.setBundle(
                    product.map(({ collection, nft }) => ({
                      collection: collection.id,
                      item: nft.id,
                      amount: nft.selected,
                    })),
                    price,
                    blockNumber,
                    blockNumber + duration.time
                  )
                );
              }

              // isRetail
              return mutation(
                api.tx.game.setPrice(
                  {
                    collection: product[0].collection.id,
                    item: product[0].nft.id,
                    amount: product[0].nft.selected,
                  },
                  price,
                  blockNumber,
                  blockNumber + duration.time
                )
              );
            }
          }}
        >
          Sign & Submit
        </Button>
      </Box>
    </>
  );
}
