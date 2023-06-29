import {
  Button,
  Center,
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
  Tr,
} from '@chakra-ui/react';

import useSignAndSend from 'hooks/useSignAndSend';

import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';
import React from 'react';
import { UseFormGetValues } from 'react-hook-form';
import { AddSupplyFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';

interface AddSupplyModal {
  onClose: () => void;
  getValues: UseFormGetValues<AddSupplyFieldProps>;
}

export default function AddSupplyModal({ getValues, onClose }: AddSupplyModal) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, item_id, amount, admin } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: admin.address,
    key: ['createItem', String(item_id)],
    onSuccess() {
      onClose();
    },
  });

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
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
              Add Supply
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
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>

              <Tr>
                <Td>Item ID</Td>
                <Td>{item_id}</Td>
              </Tr>

              <Tr>
                <Td>Amount</Td>
                <Td>{amount}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="createGameSubmit"
            margin="unset"
            isLoading={isLoading}
            _hover={{}}
            onClick={() => {
              if (api) {
                mutation(api.tx.game.addSupply(collection_id, item_id, amount));
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
