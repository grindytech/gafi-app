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

import { UseFormGetValues } from 'react-hook-form';
import { useSubstrateState } from 'contexts/substrateContext';
import useSignAndSend from 'hooks/useSignAndSend';

import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';

import { CalculatorOfRarity, ColorOfRarity } from 'utils/utils';
import { PoolsCreateFieldProps, PoolsCreateProps } from './PoolsCreate';

interface PoolsModalProps extends PoolsCreateProps {
  onClose: () => void;
  getValues: UseFormGetValues<PoolsCreateFieldProps>;
}

export default function PoolsModal({
  onClose,
  getValues,
  type,
}: PoolsModalProps) {
  const { api } = useSubstrateState();
  const { admin, id, fee, supply } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: admin.address,
    key: [type, String(id)],
  });

  return (
    <Modal isOpen={true} onClose={onClose} size="2xl">
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

          <NewGamesProfile account={admin.name} hash={admin.address} />
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
                    {supply.map(item => {
                      const weight = CalculatorOfRarity(
                        item.weight,
                        supply.map(item => item.weight)
                      );

                      return (
                        <Flex
                          key={id}
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
                            Supply {id}
                          </Heading>

                          <Box mt={4}>
                            <Text>
                              Item ID:&nbsp;
                              <Text as="span">{item.maybeNft.item}</Text>
                            </Text>

                            <Text>
                              Collection ID:&nbsp;
                              <Text as="span">{item.maybeNft.collection}</Text>
                            </Text>

                            <Text>
                              Weight: {item.weight}&nbsp;
                              <Text as="span" color={ColorOfRarity(weight)}>
                                ({weight}%)
                              </Text>
                            </Text>
                          </Box>
                        </Flex>
                      );
                    })}
                  </Grid>
                </Td>
              </Tr>

              <Tr>
                <Td>Mining fee</Td>
                <Td>{fee}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="createGameSubmit"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={() => {
              if (api) {
                if (type === 'createDynamicPool') {
                  return mutation(
                    api.tx.game.createDynamicPool(supply, fee, admin.address)
                  );
                }
                if (type === 'createStablePool') {
                  return mutation(
                    api.tx.game.createDynamicPool(supply, fee, admin.address)
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
