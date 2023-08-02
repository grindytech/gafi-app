import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

import { UseFormGetValues, UseFormReset } from 'react-hook-form';

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

interface PoolsModalProps extends PoolsCreateProps {
  onClose: () => void;
  getValues: UseFormGetValues<PoolsCreateFieldProps>;
  reset: UseFormReset<PoolsCreateFieldProps>;
}

export default function PoolsModal({
  onClose,
  getValues,
  reset,
  type,
}: PoolsModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { role, fee, supply, duration } = getValues();

  const { blockNumber } = useBlockTime('bestNumber');

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: [type, role.address],
    onSuccess() {
      reset({
        role: { ...role },
        duration: undefined as keyof typeof getValues,
        fee: undefined as keyof typeof getValues,
        supply: undefined as keyof typeof getValues,
      });
      onClose();
    },
    onError() {
      onClose();
    },
  });

  const getTotalSupply = supply.filter(item => !!item);

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
                      getTotalSupply.map((item, index) => {
                        const weight = CalculatorOfRarity(
                          item.weight,
                          getTotalSupply.map(item => item.weight)
                        );

                        return (
                          <Flex
                            flexDirection="column"
                            justifyContent="space-between"
                            border="0.0625rem solid"
                            borderColor="shader.a.400"
                            borderRadius="xl"
                            padding={4}
                          >
                            <Heading
                              fontSize="lg"
                              fontWeight="medium"
                              color="shader.a.900"
                            >
                              Supply {index}
                            </Heading>

                            <Box mt={4}>
                              {item.maybeNft?.nft_id ? (
                                <Text>
                                  Item ID:&nbsp;
                                  <Text as="span">{item.maybeNft.nft_id}</Text>
                                </Text>
                              ) : null}

                              {item.maybeNft?.collection_id ? (
                                <Text>
                                  Collection ID:&nbsp;
                                  <Text as="span">
                                    {item.maybeNft.collection_id}
                                  </Text>
                                </Text>
                              ) : null}

                              <Text>
                                Weight:&nbsp;
                                <Text as="span" color={ColorOfRarity(weight)}>
                                  ({weight}%)
                                </Text>
                              </Text>
                            </Box>
                          </Flex>
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
                const start = duration.time ? blockNumber : null;
                const end = duration.time ? blockNumber + duration.time : null;

                if (type === 'createDynamicPool') {
                  return mutation(
                    api.tx.game.createDynamicPool(supply, role.address, {
                      minType: 'Public',
                      price: unitGAFI(String(fee)),
                      startBlock: start,
                      endBlock: end,
                    })
                  );
                }
                if (type === 'createStablePool') {
                  return mutation(
                    api.tx.game.createStablePool(supply, role.address, {
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
