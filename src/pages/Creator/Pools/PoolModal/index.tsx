import {
  Button,
  Center,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { UseFormGetValues } from 'react-hook-form';
import { colors } from 'theme/theme';
import { CalculatorOfRarity, convertHex, unitGAFI } from 'utils';
import { PoolsFieldProps, PoolsProductType } from '..';

import PoolsModalCard from './PoolsModalCard';
import React from 'react';

import useSignAndSend from 'hooks/useSignAndSend';
import { useAccountContext } from 'contexts/contexts.account';
import useBlockTime from 'hooks/useBlockTime';
import { useSubstrateContext } from 'contexts/contexts.substrate';

interface PoolsModalProps {
  isDisabled: boolean;
  getValues: UseFormGetValues<PoolsFieldProps>;
  onSuccess: () => void;
}

export default ({ onSuccess, getValues, isDisabled }: PoolsModalProps) => {
  const { api } = useSubstrateContext();
  const { account } = useAccountContext();

  const { blockNumber } = useBlockTime('bestNumber');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    type_pool,
    failed,
    supply,
    minting_fee,
    collaborator,
    description,
    duration,
    title,
  } = getValues();

  const get_value_type = () => {
    const getDynamic = Object.values(supply?.['Dynamic Pool'] || []);
    const getStable = Object.values(supply?.['Stable Pool'] || []);

    if (type_pool === 'Dynamic Pool' && getDynamic.length) {
      return failed ? [...getDynamic, { weight: failed }] : getDynamic;
    }

    if (type_pool === 'Stable Pool' && getStable.length) {
      return failed ? [...getStable, { weight: failed }] : getStable;
    }

    if (failed) {
      return [{ weight: failed }];
    }
  };

  const get_value_filter = get_value_type()?.filter(
    (meta): meta is PoolsProductType => !!meta
  );

  const { mutation, isLoading } = useSignAndSend({
    key: [`creator_pool_create/${type_pool}`],
    address: account.current?.address as string,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  return (
    <>
      <Button variant="primary" onClick={onOpen} isDisabled={isDisabled}>
        Sign & Submit
      </Button>

      {isOpen ? (
        <Modal
          closeOnOverlayClick={false}
          isOpen={true}
          size="4xl"
          onClose={onClose}
        >
          <ModalOverlay />

          <ModalContent
            borderRadius="xl"
            bg="shader.a.900"
            border="0.0625rem solid"
            borderColor="shader.a.800"
          >
            <ModalHeader
              padding={6}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.800"
            >
              <Center justifyContent="space-between">
                <Text color="white" fontSize="lg" fontWeight="medium">
                  Create Pool
                </Text>

                <ModalCloseButton
                  position="unset"
                  width={6}
                  height={6}
                  color="white"
                />
              </Center>
            </ModalHeader>

            {get_value_filter?.length ? (
              <ModalBody px={6} py={4} bg="shader.a.1000">
                <Text fontSize="sm" color="shader.a.300" fontWeight="medium">
                  Total {get_value_filter.length} items
                </Text>

                <Grid
                  mt={4}
                  gap={4}
                  gridTemplateColumns={{
                    base: 'repeat(4, 11.5rem)',
                    md: 'repeat(4, 1fr)',
                  }}
                >
                  {React.Children.toArray(
                    get_value_filter?.map(
                      ({ weight, amount, collection, nft }) => {
                        const getRarity = CalculatorOfRarity(
                          weight,
                          get_value_filter.map(data => data.weight)
                        );

                        return (
                          <PoolsModalCard
                            collection={{
                              name: collection?.name,
                            }}
                            nft={{
                              name: nft?.name,
                              id: nft?.id,
                              image: nft?.image,
                            }}
                            amount={amount}
                            rarity={getRarity}
                          />
                        );
                      }
                    )
                  )}
                </Grid>
              </ModalBody>
            ) : null}

            <ModalFooter
              padding={6}
              bg={convertHex(colors.shader.a[800], 0.25)}
              borderTop="0.0625rem solid"
              borderColor="shader.a.800"
              display="block"
            >
              <Center justifyContent="space-between" mb={4}>
                <Text color="shader.a.500">Mint Fee</Text>

                <Text as="span" color="white" fontWeight="semibold">
                  {minting_fee} GAFI
                </Text>
              </Center>

              <Center justifyContent="space-between">
                <Text color="shader.a.500">Transaction fee</Text>

                <Text as="span" color="white" fontWeight="semibold">
                  50,6895 GAFI
                </Text>
              </Center>

              <Button
                mt={6}
                width="full"
                variant="primary"
                isLoading={isLoading}
                _hover={{}}
                onClick={() => {
                  if (account.current?.address && api && get_value_filter) {
                    const modifield = get_value_filter.map(meta => ({
                      weight: meta.weight,
                      maybeNft: meta?.collection
                        ? {
                            collection: Number(meta.collection.id),
                            item: Number(meta.nft.id),
                          }
                        : null,
                    }));

                    const method =
                      type_pool === 'Dynamic Pool'
                        ? 'createDynamicPoolWithData'
                        : 'createStablePoolWithData';

                    mutation(
                      api.tx.game[method](
                        modifield,
                        collaborator.account.address,
                        {
                          mintType: 'Public',
                          price: BigInt(unitGAFI(minting_fee)),
                          startBlock: duration?.time ? blockNumber : null,
                          endBlock: duration?.time
                            ? blockNumber + duration.time
                            : null,
                        },
                        JSON.stringify({
                          title,
                          description,
                        })
                      )
                    );
                  }
                }}
              >
                Sign & Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};
