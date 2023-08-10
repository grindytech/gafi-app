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

import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { AddCollectionFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';
import AuthorizeProfile from 'layouts/AuthorizeProfile';

interface AddCollectionsModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<AddCollectionFieldProps>;
  reset: UseFormReset<AddCollectionFieldProps>;
}

export default function AddCollectionsModal({
  getValues,
  onClose,
  reset,
}: AddCollectionsModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { role, collection_id, game_id } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['addCollection', collection_id],
    onSuccess() {
      reset({
        role: { ...role },
        collection_id: undefined,
        game_id: undefined,
      });
      onClose();
    },
    onError() {
      onClose();
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="xl"
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
              Add collection
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <AuthorizeProfile account={role.name} hash={role.address} />
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
                <Td>Game ID</Td>
                <Td>{game_id}</Td>
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
                mutation(api.tx.game.addGameCollection(game_id, collection_id));
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