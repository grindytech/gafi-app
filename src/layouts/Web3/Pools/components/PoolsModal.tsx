import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

import { UseFormGetValues } from 'react-hook-form';

import useSignAndSend from 'hooks/useSignAndSend';

import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';

import {
  CalculatorOfRarity,
  ColorOfRarity,
  formatGAFI,
  unitGAFI,
} from 'utils/utils';
import { PoolsCreateFieldProps, PoolsCreateProps } from './PoolsCreate';
import { useAppSelector } from 'hooks/useRedux';
import useBlockTime from 'hooks/useBlockTime';
import { isUndefined } from '@polkadot/util';

interface PoolsModalProps extends PoolsCreateProps {
  onClose: () => void;
  onSuccess: () => void;
  getValues: UseFormGetValues<PoolsCreateFieldProps>;
}

export default function PoolsModal({
  onClose,
  onSuccess,
  getValues,
  type,
}: PoolsModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { role, fee, supply: getSupply, duration } = getValues();
  const supply = getSupply.filter(meta => !!meta);

  const { blockNumber } = useBlockTime('bestNumber');

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: [type, role.address],
    onSuccess,
    onError() {
      onClose();
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="2xl"
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />

      <ModalContent
        padding={{
          base: 4,
          md: 6,
        }}
        mx={3}
      >
        <ModalHeader px={0} pt={0} pb={6}>
          <Center justifyContent="space-between" pb={8}>
            <Heading fontWeight="bold" fontSize="xl" color="shader.a.900">
              {type === 'createDynamicPool'
                ? 'Create Dynamic Pool'
                : 'Create Stable Pool'}
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <NewGamesProfile account={role.name} hash={role.address} />
        </ModalHeader>

        <ModalBody
          padding={0}
          borderWidth="0.0625rem 0 0.0625rem 0"
          borderColor="shader.a.300"
        >
          <Table variant="createGameSubmit">
            <Tbody>
              <Tr>
                <Td>
                  <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                    {React.Children.toArray(
                      supply.map((item, index) => {
                        const weight = CalculatorOfRarity(
                          item.weight,
                          supply.map(item => item.weight)
                        );

                        const isFailed = isUndefined(item.maybeNft?.collection);

                        return (
                          <Stack
                            justifyContent="space-between"
                            border="0.0625rem solid"
                            borderColor="shader.a.400"
                            borderRadius="xl"
                            padding={4}
                            spacing={4}
                          >
                            <Heading
                              fontSize="lg"
                              fontWeight="medium"
                              color="shader.a.900"
                            >
                              Supply {index}
                            </Heading>

                            <Box>
                              {!isFailed && (
                                <Text>
                                  Item ID:&nbsp;
                                  <Text as="span">{item.maybeNft?.item}</Text>
                                </Text>
                              )}

                              {!isFailed && (
                                <Text>
                                  Collection ID:&nbsp;
                                  <Text as="span">
                                    {item.maybeNft?.collection}
                                  </Text>
                                </Text>
                              )}

                              <Text>
                                Weight:&nbsp;
                                <Text as="span" color={ColorOfRarity(weight)}>
                                  ({weight}%)
                                </Text>
                              </Text>
                            </Box>
                          </Stack>
                        );
                      })
                    )}
                  </Grid>
                </Td>
              </Tr>

              <Tr>
                <Td>Mining fee</Td>
                <Td>{formatGAFI(unitGAFI(String(fee)))}</Td>
              </Tr>

              <Tr>
                <Td>Duration</Td>
                <Td>{duration?.text}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={() => {
              if (api) {
                const start = duration?.time ? blockNumber : null;
                const end = duration?.time ? blockNumber + duration.time : null;

                const modifed = supply.map(item => {
                  return {
                    weight: item.weight,
                    maybeNft: item.maybeNft?.collection ? item.maybeNft : null,
                  };
                });

                if (type === 'createDynamicPool') {
                  return mutation(
                    api.tx.game.createDynamicPool(modifed, role.address, {
                      minType: 'Public',
                      price: unitGAFI(String(fee)),
                      startBlock: start,
                      endBlock: end,
                    })
                  );
                }
                if (type === 'createStablePool') {
                  return mutation(
                    api.tx.game.createStablePool(modifed, role.address, {
                      minType: 'Public',
                      price: unitGAFI(String(fee)),
                      startBlock: start,
                      endBlock: end,
                    })
                  );
                }
              }
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
