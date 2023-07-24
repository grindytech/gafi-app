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

import { UseFormGetValues } from 'react-hook-form';
import { CreateItemFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';

interface CreateItemModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<CreateItemFieldProps>;
}

export default function CreateItemModal({
  getValues,
  onClose,
}: CreateItemModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, item_id, role, maybeSupply } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
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
              Create Item
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
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>

              <Tr>
                <Td>Item ID</Td>
                <Td>{item_id}</Td>
              </Tr>

              {maybeSupply && (
                <Tr>
                  <Td>Supply</Td>
                  <Td>{maybeSupply}</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            margin="unset"
            isLoading={isLoading}
            _hover={{}}
            onClick={() => {
              if (api) {
                mutation(
                  api.tx.game.createItem(
                    collection_id,
                    item_id,
                    {},
                    maybeSupply
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
  );
}
