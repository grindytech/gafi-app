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
import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';

import { UseFormGetValues } from 'react-hook-form';

import useSignAndSend from 'hooks/useSignAndSend';
import { AcceptCollectionsFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';

interface AcceptCollectionsModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<AcceptCollectionsFieldProps>;
}

export default function AcceptCollectionsModal({
  onClose,
  getValues,
}: AcceptCollectionsModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, game_id, admin } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: admin.address,
    key: ['acceptAdding', collection_id],
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
              Add Accept Adding
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
                <Td>Game ID</Td>
                <Td>{game_id}</Td>
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
                mutation(api.tx.game.setAcceptAdding(game_id, collection_id));
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
